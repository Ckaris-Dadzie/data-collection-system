// 📁 routes/viewAllActionPlans.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// ✅ GET /api/action-plan/all?page=1&limit=10&sub_municipal=...&facility_name=...&quarter=...&monitoring_year=...
router.get('/all', async (req, res) => {
  const {
    page = 1,
    limit = 10,
    sub_municipal,
    facility_name,
    quarter,
    monitoring_year
  } = req.query;

  const offset = (page - 1) * limit;

  try {
    const values = [];
    const filters = [];

    // 📌 Apply filters only if they are provided
    if (sub_municipal) {
      values.push(sub_municipal);
      filters.push(`sub_municipal = $${values.length}`);
    }

    if (facility_name) {
      values.push(facility_name);
      filters.push(`facility_name = $${values.length}`);
    }

    if (quarter) {
      values.push(quarter);
      filters.push(`quarter = $${values.length}`);
    }

    if (monitoring_year) {
      values.push(monitoring_year);
      filters.push(`monitoring_year = $${values.length}`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

    // 🔢 Count total rows
    const countResult = await pool.query(
      `SELECT COUNT(*) FROM action_plans ${whereClause}`,
      values
    );
    const totalCount = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit);

    // 📦 Fetch paginated results
    values.push(limit, offset); // Add for LIMIT and OFFSET
    const dataResult = await pool.query(
      `SELECT * FROM action_plans ${whereClause} ORDER BY date DESC LIMIT $${values.length - 1} OFFSET $${values.length}`,
      values
    );

    res.json({
      success: true,
      data: dataResult.rows,
      totalCount,
      totalPages,
      currentPage: parseInt(page)
    });

  } catch (err) {
    console.error("❌ Error fetching action plans:", err.stack || err);
    res.status(500).json({ success: false, message: "Failed to fetch action plans", error: err.message });
  }
});

module.exports = router;
