const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../db');

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      
      // Update order status in DB
      // Note: We need to pass the orderId in metadata or client_reference_id
      const orderId = session.metadata.orderId;
      
      try {
        await db.execute({
          sql: 'UPDATE orders SET status = "Paid" WHERE id = ?',
          args: [orderId],
        });
        console.log(`Order ${orderId} marked as Paid`);
      } catch (dbError) {
        console.error('Error updating order status:', dbError);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.send();
});

module.exports = router;
