//1. Main
const express = require('express');
const router = express.Router();
const pool = require('../db');

// 🔹 POST /api/forms – Submit a new form and answers
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      form_type,
      monitoring_number,
      organisation_name,
      project_name,
      program,
      region,
      sub_municipal,
      facility_visited,
      location,
      respondents,
      monitoring_team,
      team_members,
      general_comments,
      answers // ⬅️ From frontend: must include question_id, answer, remark, score
    } = req.body;

    await client.query('BEGIN');

    // ✅ Insert into forms table
    const formInsert = await client.query(`
      INSERT INTO forms (
        form_type, monitoring_number, organisation_name, project_name,
        program, region, sub_municipal, facility_visited, location,
        respondents, monitoring_team, team_members, general_comments
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING id
    `, [
      form_type,
      monitoring_number,
      organisation_name,
      project_name,
      program,
      region,
      sub_municipal,
      facility_visited,
      location,
      respondents,
      monitoring_team,
      team_members,
      general_comments
    ]);

    const formId = formInsert.rows[0].id;

    // ✅ Insert answers
    if (Array.isArray(answers) && answers.length > 0) {
      for (const a of answers) {
        await client.query(`
          INSERT INTO answers (form_id, question_id, answer, remark, score)
          VALUES ($1, $2, $3, $4, $5)
        `, [
          formId,
          a.question_id || null,
          a.answer || null,
          a.remark || null,
          a.score !== "" ? parseInt(a.score) : null
        ]);
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ success: true, message: "Form and answers submitted successfully." });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("❌ Error in POST /api/forms:", err.message);
    res.status(500).json({ success: false, message: "Server error while submitting form." });
  } finally {
    client.release();
  }
});

// 🔹 GET /api/forms/questions/:program – Fetch questions by program
router.get('/questions/:program', async (req, res) => {
  try {
    const { program } = req.params;

    const result = await pool.query(`
      SELECT id, question_text, question_number
      FROM questions
      WHERE program = $1
      ORDER BY question_number
    `, [program]);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching questions:", err.message);
    res.status(500).json({ success: false, message: "Server error while fetching questions." });
  }
});

// 🔹 GET /api/forms/search – Search forms + joined answers + questions
router.get('/search', async (req, res) => {
  try {
    const {
      form_type,
      monitoring_number,
      program,
      sub_municipal,
      facility_visited
    } = req.query;

    // Build dynamic WHERE clause
    const conditions = [];
    const values = [];

    if (form_type) {
      conditions.push(`form_type = $${values.length + 1}`);
      values.push(form_type);
    }
    if (monitoring_number) {
      conditions.push(`monitoring_number = $${values.length + 1}`);
      values.push(monitoring_number);
    }
    if (program) {
      conditions.push(`program = $${values.length + 1}`);
      values.push(program);
    }
    if (sub_municipal) {
      conditions.push(`sub_municipal = $${values.length + 1}`);
      values.push(sub_municipal);
    }
    if (facility_visited) {
      conditions.push(`facility_visited = $${values.length + 1}`);
      values.push(facility_visited);
    }

    // 📦 Final form query
    let query = `SELECT * FROM forms`;
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const formRes = await pool.query(query, values);

    // 🚫 No form found
    if (formRes.rows.length === 0) {
      return res.status(200).json({ success: true, forms: [] });
    }

    const form = formRes.rows[0];

    // ✅ Get linked answers + question details (JOIN)
    const answerRes = await pool.query(`
      SELECT q.id as question_id, q.question_number, q.question_text, a.answer, a.remark, a.score
      FROM answers a
      JOIN questions q ON a.question_id = q.id
      WHERE a.form_id = $1
      ORDER BY q.question_number
    `, [form.id]);

    res.status(200).json({
      success: true,
      forms: [form],
      questions: answerRes.rows
    });

  } catch (err) {
    console.error("❌ Error in GET /api/forms/search:", err.message);
    res.status(500).json({ success: false, message: "Server error while searching forms." });
  }
});

module.exports = router;

//======================================================
//the code below handles the edit form for updating data 
//======================================================
// 📁 In routes/forms.js or wherever you define form routes

// 🔁 PUT /api/forms/:id – Update form metadata and answers
router.put('/:id', async (req, res) => {
  const formId = req.params.id;
  const {
    monitoring_number,
    form_type,
    program,
    organisation_name,
    project_name,
    region,
    sub_municipal,
    facility_visited,
    location,
    respondents,
    monitoring_team,
    team_members,
    general_comments,
    answers // <- may be an empty array or undefined
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // ✅ 1. Update only metadata + general comments
    await client.query(`
      UPDATE forms
      SET
        monitoring_number = $1,
        form_type = $2,
        program = $3,
        organisation_name = $4,
        project_name = $5,
        region = $6,
        sub_municipal = $7,
        facility_visited = $8,
        location = $9,
        respondents = $10,
        monitoring_team = $11,
        team_members = $12,
        general_comments = $13
      WHERE id = $14
    `, [
      monitoring_number,
      form_type,
      program,
      organisation_name,
      project_name,
      region,
      sub_municipal,
      facility_visited,
      location,
      respondents,
      monitoring_team,
      team_members,
      general_comments,
      formId
    ]);

    // ✅ 2. Only update answers if answers were included and not empty
    if (req.body.hasOwnProperty("answers")) {
      if (Array.isArray(answers) && answers.length > 0) {
        // Delete and reinsert only if new answers provided
        await client.query('DELETE FROM answers WHERE form_id = $1', [formId]);

        for (const ans of answers) {
          await client.query(`
            INSERT INTO answers (form_id, question_id, answer, remark, score)
            VALUES ($1, $2, $3, $4, $5)
          `, [
            formId,
            ans.question_id,
            ans.answer,
            ans.remark,
            ans.score
          ]);
        }
      } else {
        // ✅ answers is empty → do not delete anything
        console.log("✅ No answers provided – skipping update to answers table.");
      }
    } else {
      // ✅ "answers" not present in request → also do nothing
      console.log("✅ Request has no 'answers' field – answers left untouched.");
    }


    await client.query('COMMIT');
    res.status(200).json({ success: true, message: 'Form updated successfully' });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update form' });
  } finally {
    client.release();
  }
});

//=============================
//Duplicate check for Forms 
//=============================

// ✅ Duplicate Check – GET /api/forms/check-duplicate
router.get('/check-duplicate', async (req, res) => {
  const { monitoring_number, form_type, program, sub_municipal, facility_visited } = req.query;

  try {
    const result = await pool.query(
      `SELECT id FROM forms WHERE monitoring_number = $1 AND form_type = $2 AND program = $3 AND sub_municipal = $4 AND facility_visited = $5`,
      [monitoring_number, form_type, program, sub_municipal, facility_visited]
    );

    if (result.rows.length > 0) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (err) {
    console.error("❌ Error checking duplicate form:", err.message);
    res.status(500).json({ exists: false, error: "Server error while checking for duplicates" });
  }
});
