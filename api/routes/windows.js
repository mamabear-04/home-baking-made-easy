const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Get all order windows
router.get('/', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM order_windows ORDER BY fulfillment_date DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get current active window
router.get('/active', async (req, res) => {
  try {
    const now = new Date().toISOString();
    const result = await db.execute({
      sql: 'SELECT * FROM order_windows WHERE orders_open_at <= ? AND orders_close_at >= ? AND status = \'Open\' LIMIT 1',
      args: [now, now],
    });
    res.json(result.rows[0] || null);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create order window
router.post('/', async (req, res) => {
  const { title, orders_open_at, orders_close_at, fulfillment_date, status } = req.body;
  const id = uuidv4();
  try {
    await db.execute({
      sql: 'INSERT INTO order_windows (id, title, orders_open_at, orders_close_at, fulfillment_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      args: [id, title, orders_open_at, orders_close_at, fulfillment_date, status || 'Upcoming'],
    });
    res.status(201).json({ id, title, orders_open_at, orders_close_at, fulfillment_date, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
