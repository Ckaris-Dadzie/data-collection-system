// 📁 routes/viewAllActionPlans.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ GET /api/view-all-action-plans
router.get('/', async (req, res) => {
  const {
    sub_municipal,
    facility_name,
    quarter,
    monitoring_year,
    page = 1,
    limit = 50
  } = req.query;

  const offset = (parseInt(page) - 1) * parseInt(limit);

  try {
    const client = await pool.connect();

    // 🔍 Build query strings with optional filters
    let baseQuery = `SELECT * FROM action_plans WHERE 1=1`;
    let countQuery = `SELECT COUNT(*) FROM action_plans WHERE 1=1`;
    const params = [];
    let i = 1;

    if (sub_municipal) {
      baseQuery += ` AND sub_municipal = $${i}`;
      countQuery += ` AND sub_municipal = $${i}`;
      params.push(sub_municipal);
      i++;
    }

    if (facility_name) {
      baseQuery += ` AND facility_name = $${i}`;
      countQuery += ` AND facility_name = $${i}`;
      params.push(facility_name);
      i++;
    }

    if (quarter) {
      baseQuery += ` AND quarter = $${i}`;
      countQuery += ` AND quarter = $${i}`;
      params.push(quarter);
      i++;
    }

    if (monitoring_year) {
      baseQuery += ` AND monitoring_year = $${i}`;
      countQuery += ` AND monitoring_year = $${i}`;
      params.push(monitoring_year);
      i++;
    }

    // 📦 Pagination
    baseQuery += ` ORDER BY date DESC LIMIT $${i} OFFSET $${i + 1}`;
    params.push(limit, offset);

    // 📊 Query database
    const dataResult = await client.query(baseQuery, params);
    const countResult = await client.query(countQuery, params.slice(0, i - 1));

    client.release();

    // 📤 Respond
    res.json({
      success: true,
      plans: dataResult.rows,
      total: parseInt(countResult.rows[0].count)
    });

  } catch (err) {
    console.error("❌ Error fetching paginated plans:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

module.exports = router;
