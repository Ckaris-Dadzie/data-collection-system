const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ GET /api/view-all-action-plans
router.get('/', async (req, res) => {
  const { sub_municipal, facility_name, quarter, monitoring_year } = req.query;

  try {
    const client = await pool.connect();

    let query = `SELECT * FROM action_plans WHERE 1=1`;
    const params = [];
    let i = 1;

    if (sub_municipal) {
      query += ` AND sub_municipal = $${i++}`;
      params.push(sub_municipal);
    }
    if (facility_name) {
      query += ` AND facility_name = $${i++}`;
      params.push(facility_name);
    }
    if (quarter) {
      query += ` AND quarter = $${i++}`;
      params.push(quarter);
    }
    if (monitoring_year) {
      query += ` AND monitoring_year = $${i++}`;
      params.push(monitoring_year);
    }

    query += ` ORDER BY date DESC`;

    const result = await client.query(query, params);
    client.release();

    res.json({ success: true, plans: result.rows });

  } catch (err) {
    console.error("❌ Error loading action plans:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
