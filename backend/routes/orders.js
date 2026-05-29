const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Get all orders (Admin only eventually)
router.get('/', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const { user_id, window_id, items, fulfillment_method, total_amount } = req.body;
  const orderId = uuidv4();
  
  try {
    // Start transaction (using batch in libsql)
    const queries = [
      {
        sql: 'INSERT INTO orders (id, user_id, window_id, total_amount, fulfillment_method, status) VALUES (?, ?, ?, ?, ?, ?)',
        args: [orderId, user_id, window_id, total_amount, fulfillment_method, 'Pending'],
      }
    ];

    for (const item of items) {
      queries.push({
        sql: 'INSERT INTO order_items (id, order_id, product_id, quantity, price_at_order) VALUES (?, ?, ?, ?, ?)',
        args: [uuidv4(), orderId, item.product_id, item.quantity, item.price],
      });
    }

    await db.batch(queries, "write");
    
    res.status(201).json({ orderId, status: 'Pending' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const orderResult = await db.execute({
      sql: 'SELECT * FROM orders WHERE id = ?',
      args: [req.params.id],
    });
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const itemsResult = await db.execute({
      sql: 'SELECT * FROM order_items WHERE order_id = ?',
      args: [req.params.id],
    });

    res.json({
      ...orderResult.rows[0],
      items: itemsResult.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
