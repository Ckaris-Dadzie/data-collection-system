// 📁 routes/actionPlan.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // make sure your pool is set up for PostgreSQL or MySQL

// ✅ POST /api/action-plan
router.post('/', async (req, res) => {
  const {
    sub_municipal,
    facility_name,
    quarter,
    date,
    supervisor_name,
    in_charge_name,
    actions
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1️⃣ Insert metadata into action_plan_forms
    const formInsert = await client.query(`
      INSERT INTO action_plan_forms (
        sub_municipal, facility_name, quarter, date, supervisor_name, in_charge_name
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `, [
      sub_municipal, facility_name, quarter, date, supervisor_name, in_charge_name
    ]);

    const formId = formInsert.rows[0].id;

    // 2️⃣ Insert each action row
    for (const act of actions) {
      await client.query(`
        INSERT INTO action_plan_actions (
          form_id, clinical_area, challenges, proposed_changes,
          indicator, time_frame, person_responsible, resources, next_assessment
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      `, [
        formId,
        act.clinical_area,
        act.challenges,
        act.proposed_changes,
        act.indicator,
        act.time_frame,
        act.person_responsible,
        act.resources,
        act.next_assessment
      ]);
    }

    await client.query('COMMIT');
    res.status(200).json({ success: true, message: 'Action plan submitted!' });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Action Plan Error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit action plan' });
  } finally {
    client.release();
  }
});

module.exports = router;
