const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/create-checkout-session', async (req, res) => {
  const { items, windowId, fulfillmentMethod, user_id } = req.body;
  const orderId = uuidv4();

  try {
    // 1. Calculate total and prepare DB queries
    let totalAmount = 0;
    const queries = [];
    
    // Primary order record
    queries.push({
      sql: 'INSERT INTO orders (id, user_id, window_id, total_amount, fulfillment_method, status) VALUES (?, ?, ?, ?, ?, ?)',
      args: [orderId, user_id || 'guest', windowId, 0, fulfillmentMethod, 'Pending'],
    });

    for (const item of items) {
      const price = item.price;
      totalAmount += price * item.quantity;
      queries.push({
        sql: 'INSERT INTO order_items (id, order_id, product_id, quantity, price_at_order) VALUES (?, ?, ?, ?, ?)',
        args: [uuidv4(), orderId, item.product_id, item.quantity, price],
      });
    }

    // Update total amount in the first query
    queries[0].args[3] = totalAmount;

    // 2. Create the order in DB (status=Pending)
    await db.batch(queries, "write");

    // 3. Map items to Stripe line items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: item.image_url ? [item.image_url] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // 4. Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?orderId=${orderId}`,
      metadata: {
        orderId,
        windowId,
        fulfillmentMethod,
        user_id: user_id || 'guest'
      },
    });

    res.json({ id: session.id, url: session.url, orderId });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
