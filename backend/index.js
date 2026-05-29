const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Webhook route needs raw body for signature verification
const webhookRoutes = require('./routes/webhooks');
app.use('/api/webhooks', webhookRoutes);

app.use(express.json());

// Import routes
const productRoutes = require('./routes/products');
const windowRoutes = require('./routes/windows');
const orderRoutes = require('./routes/orders');
const checkoutRoutes = require('./routes/checkout');

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/products', productRoutes);
app.use('/api/windows', windowRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', checkoutRoutes);

app.listen(port, '0.0.0.0', () => {
  console.log(`The Local Crumb Backend listening on http://0.0.0.0:${port}`);
});
