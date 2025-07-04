// server/db.js
const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: {
    rejectUnauthorized: false, // <-- This is required for Supabase
  },
});

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   model: process.env.DB_POOL_MODEL,
// });
console.log("Connecting to:", process.env.SUPABASE_DB_URL);


pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL via connection string"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

module.exports = pool;


