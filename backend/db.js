const { createClient } = require('@libsql/client');
require('dotenv').config();

const url = process.env.TEAM_DB_URL;
const authToken = process.env.TEAM_DB_AUTH_TOKEN;

if (!url) {
  console.error("TEAM_DB_URL is not set");
}

const db = createClient({
  url: url || 'file:local.db',
  authToken: authToken,
});

module.exports = db;
