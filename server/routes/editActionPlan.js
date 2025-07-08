// 📁 routes/editActionPlan.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// =============================
// ✅ Search for Action Plan by Sub-Municipal, Facility, Quarter & Year
// =============================
router.get('/search', async (req, res) => {
  const { sub_municipal, facility_name, quarter, monitoring_year } = req.query;

  try {
    // 1️⃣ Search the action plan based on the four filters
    const result = await pool.query(`
      SELECT * FROM action_plans 
      WHERE sub_municipal = $1 AND facility_name = $2 AND quarter = $3 AND monitoring_year = $4
      LIMIT 1
    `, [sub_municipal, facility_name, quarter, monitoring_year]);

    // 2️⃣ If not found, return a 404
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "No matching action plan found" });
    }

    const plan = result.rows[0];

    // 3️⃣ Fetch the associated action items
    const actionsResult = await pool.query(`
      SELECT * FROM action_items WHERE form_id = $1
    `, [plan.id]);

    // 4️⃣ Attach actions to the main plan object
    plan.actions = actionsResult.rows;

    // 5️⃣ Return success with plan and actions
    res.status(200).json({ success: true, plan });

  } catch (err) {
    console.error("❌ Error searching for action plan:", err.stack || err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});



// =============================
// ✅ PUT /api/edit-action-plan/:id
// =============================
router.put('/:id', async (req, res) => {
  const formId = req.params.id;

  const {
    sub_municipal,
    facility_name,
    quarter,
    monitoring_year,
    date,
    supervisor_name,
    in_charge_name,
    actions
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1️⃣ Update metadata
    await client.query(`
      UPDATE action_plans
      SET sub_municipal = $1,
          facility_name = $2,
          quarter = $3,
          monitoring_year = $4,
          date = $5,
          supervisor_name = $6,
          in_charge_name = $7
      WHERE id = $8
    `, [
      sub_municipal,
      facility_name,
      quarter,
      monitoring_year,
      date,
      supervisor_name,
      in_charge_name,
      formId
    ]);

    // 2️⃣ Delete old action items
    await client.query('DELETE FROM action_items WHERE form_id = $1', [formId]);

    // 3️⃣ Insert new action items
    for (const item of actions) {
      await client.query(`
        INSERT INTO action_items (
          form_id, clinical_area, challenges, proposed_changes,
          indicator, time_frame, person_responsible, resources, next_assessment
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      `, [
        formId,
        item.clinical_area,
        item.challenges,
        item.proposed_changes,
        item.indicator,
        item.time_frame,
        item.person_responsible,
        item.resources,
        item.next_assessment
      ]);
    }

    await client.query('COMMIT');
    res.json({ success: true, message: "Action Plan updated successfully." });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("❌ Error updating action plan:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  } finally {
    client.release();
  }
});

module.exports = router;
