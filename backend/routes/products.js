const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// Get all products
router.get('/', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM products WHERE id = ?',
      args: [req.params.id],
    });
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create product
router.post('/', async (req, res) => {
  const { name, description, base_price, image_url } = req.body;
  const id = uuidv4();
  try {
    await db.execute({
      sql: 'INSERT INTO products (id, name, description, base_price, image_url) VALUES (?, ?, ?, ?, ?)',
      args: [id, name, description, base_price, image_url],
    });
    res.status(201).json({ id, name, description, base_price, image_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
