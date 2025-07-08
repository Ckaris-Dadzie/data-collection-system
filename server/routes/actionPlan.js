// 📁 routes/actionPlan.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // make sure your pool is set up for PostgreSQL or MySQL

// ✅ POST /api/action-plan
router.post('/', async (req, res) => {
  console.log("🔔 /api/action-plan route hit");
  console.log("Headers:", req.headers);
  console.log("Request body:", req.body);

  // Validate request body
 const requiredFields = [
  'sub_municipal',
  'facility_name',
  'quarter',
  'monitoring_year',
  'date',
  'supervisor_name',
  'in_charge_name',
  'actions'
];
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      console.error(`❌ Missing required field: ${field}`);
      return res.status(400).json({ success: false, message: `Missing required field: ${field}` });
    }
  }

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


  if (!Array.isArray(actions) || actions.length === 0) {
    console.error('❌ Actions array is missing or empty');
    return res.status(400).json({ success: false, message: 'Actions array is missing or empty' });
  }

  const client = await pool.connect();
  const dbNameResult = await client.query('SELECT current_database()');
  console.log('🗄️ Connected to database:', dbNameResult.rows[0].current_database);
  console.log("🔗 Database connection established");

  try {
    await client.query('BEGIN');

    // 1️⃣ Insert metadata into action_plans
    const formInsert = await client.query(`
      INSERT INTO action_plans (
        sub_municipal, facility_name, quarter, monitoring_year, date, supervisor_name, in_charge_name
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `, [
        sub_municipal,
        facility_name,
        quarter,
        monitoring_year,     
        date,
        supervisor_name,
        in_charge_name
    ]);
    console.log("✅ Form inserted:", formInsert.rows[0]);

    const formId = formInsert.rows[0].id;

    // 2️⃣ Insert each action row
    for (const act of actions) {
      await client.query(`
        INSERT INTO action_items (
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
    console.error('❌ Action Plan Error:', err.stack || err);
    res.status(500).json({ success: false, message: 'Failed to submit action plan', error: err.message });
  } finally {
    client.release();
  }
});


//=============================
// ✅ DELETE /api/action-plan/:id
//=============================
router.delete('/:id', async (req, res) => {
  const planId = req.params.id;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Delete from child table first
    await client.query('DELETE FROM action_items WHERE form_id = $1', [planId]);

    // Then delete parent
    await client.query('DELETE FROM action_plans WHERE id = $1', [planId]);

    await client.query('COMMIT');
    res.status(200).json({ success: true, message: "Deleted successfully" });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("❌ Delete error:", err);
    res.status(500).json({ success: false, message: "Delete failed", error: err.message });
  } finally {
    client.release();
  }
});


// =============================
// ✅ GET /api/action-plan/view
// =============================
router.get('/view', async (req, res) => {
  const { sub_municipal, facility_name, quarter, monitoring_year } = req.query;

  try {
    const client = await pool.connect();

    // 1️⃣ Find the matching action plan
    const planResult = await client.query(`
      SELECT * FROM action_plans
      WHERE sub_municipal = $1 AND facility_name = $2 AND quarter = $3 AND monitoring_year = $4
      LIMIT 1
    `, [sub_municipal, facility_name, quarter, monitoring_year]);

    if (planResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "No matching action plan found", plans: [] });
    }

    const plan = planResult.rows[0];

    // 2️⃣ Fetch action items for the plan
    const actionItemsResult = await client.query(`
      SELECT * FROM action_items WHERE form_id = $1
    `, [plan.id]);

    // Add the actions to the plan object
    plan.actions = actionItemsResult.rows;

    res.status(200).json({ success: true, plans: [plan] });

    client.release();
  } catch (err) {
    console.error("❌ Error fetching action plan:", err.stack || err);
    res.status(500).json({ success: false, message: "Failed to retrieve action plan", error: err.message });
  }
});



module.exports = router;
