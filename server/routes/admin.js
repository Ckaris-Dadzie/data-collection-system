const express = require('express');
const router = express.Router();
const pool = require('../db');


// Get all forms (with optional filters + pagination)
router.get('/', async (req, res) => {
  const { form_type, year, program, sub_municipal, facility_visited, page = 1, limit = 30 } = req.query;
  let query = `SELECT * FROM forms`;
  let countQuery = `SELECT COUNT(*) FROM forms`;
  let values = [];
  const conditions = [];

  if (form_type) {
    conditions.push(`form_type = $${conditions.length + 1}`);
    values.push(form_type);
  }

  if (year) {
    conditions.push(`monitoring_number LIKE $${conditions.length + 1}`);
    values.push(`%${year}`);
  }

  if (program) {
    conditions.push(`program = $${conditions.length + 1}`);
    values.push(program);
  }

  if (sub_municipal) {
    conditions.push(`sub_municipal = $${conditions.length + 1}`);
    values.push(sub_municipal);
  }

  if (facility_visited) {
    conditions.push(`facility_visited = $${conditions.length + 1}`);
    values.push(facility_visited);
  }

  if (conditions.length) {
    const whereClause = ` WHERE ` + conditions.join(' AND ');
    query += whereClause;
    countQuery += whereClause;
  }

  query += ` ORDER BY created_at DESC`;

  // Pagination setup
  const offset = (parseInt(page) - 1) * parseInt(limit);
  query += ` LIMIT ${limit} OFFSET ${offset}`;

  try {
    const result = await pool.query(query, values);
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      forms: result.rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("❌ Admin fetch error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// // Get all forms (with optional filters)
// router.get('/', async (req, res) => {
//   const { form_type, year, program, sub_municipal, facility_visited } = req.query;
//   let query = `SELECT * FROM forms`;
//   let values = [];
//   const conditions = [];

//   if (form_type) {
//     conditions.push(`form_type = $${conditions.length + 1}`);
//     values.push(form_type);
//   }

//   if (year) {
//     conditions.push(`monitoring_number LIKE $${conditions.length + 1}`);
//     values.push(`%${year}`);
//   }

//   if (program) {
//     conditions.push(`program = $${conditions.length + 1}`);
//     values.push(program);
//   }

//   if (sub_municipal) {
//   conditions.push(`sub_municipal = $${conditions.length + 1}`);
//   values.push(sub_municipal);
//   }

//   if (facility_visited) {
//     conditions.push(`facility_visited = $${conditions.length + 1}`);
//     values.push(facility_visited);
//   }

//   if (conditions.length) {
//     query += ` WHERE ` + conditions.join(' AND ');
//   }

//   query += ` ORDER BY created_at DESC`;

//   try {
//     const result = await pool.query(query, values);
//     res.json({ success: true, forms: result.rows });
//   } catch (err) {
//     console.error("❌ Admin fetch error:", err.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// // Delete a form
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await pool.query(`DELETE FROM answers WHERE form_id = $1`, [id]);
//     await pool.query(`DELETE FROM forms WHERE id = $1`, [id]);
//     res.json({ success: true, message: "Form deleted." });
//   } catch (err) {
//     console.error("❌ Delete error:", err.message);
//     res.status(500).json({ success: false });
//   }
// });

//Function of the API below. 
//1. GET /api/admin/:id – Fetch full form data
//1. This route will return:
//3.Form metadata
//4.Associated answers with questions

// GET a single form with answers
router.get('/:id', async (req, res) => {
  const formId = req.params.id;

  try {
    // Fetch metadata
    const formQuery = await pool.query(`SELECT * FROM forms WHERE id = $1`, [formId]);
    if (formQuery.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    const form = formQuery.rows[0];

    // Fetch questions and answers
    const answersQuery = await pool.query(`
      SELECT q.id AS question_id, q.question_text, a.answer, a.remark, a.score
      FROM questions q
      LEFT JOIN answers a ON q.id = a.question_id AND a.form_id = $1
      WHERE q.program = $2
      ORDER BY q.id ASC
    `, [formId, form.program]);

    res.json({
      success: true,
      form,
      questions: answersQuery.rows
    });

  } catch (error) {
    console.error("❌ Error fetching form:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//Funtion of the API below. 
//PUT /api/admin/:id – Update form metadata + answers
// UPDATE form and answers
router.put('/:id', async (req, res) => {
  const formId = req.params.id;
  const {
    form,
    answers, // [{question_id, answer, remark, score}]
  } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(`DELETE FROM answers WHERE form_id = $1`, [id]);
    await client.query(`DELETE FROM forms WHERE id = $1`, [id]);
    await client.query('COMMIT');
    res.json({ success: true, message: "Form deleted." });

    // Update form metadata
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
      general_comments
    } = form;

    await client.query(`
      UPDATE forms SET
        form_type = $1,
        monitoring_number = $2,
        organisation_name = $3,
        project_name = $4,
        program = $5,
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
      formId
    ]);

    // Update or insert each answer
    for (const ans of answers) {
      const { question_id, answer, remark, score } = ans;

      // Check if answer exists
      const check = await client.query(
        `SELECT id FROM answers WHERE form_id = $1 AND question_id = $2`,
        [formId, question_id]
      );

      if (check.rows.length > 0) {
        // Update existing answer
        await client.query(`
          UPDATE answers
          SET answer = $1, remark = $2, score = $3
          WHERE form_id = $4 AND question_id = $5
        `, [answer, remark, score, formId, question_id]);
      } else {
        // Insert new answer
        await client.query(`
          INSERT INTO answers (form_id, question_id, answer, remark, score)
          VALUES ($1, $2, $3, $4, $5)
        `, [formId, question_id, answer, remark, score]);
      }
    }

    await client.query('COMMIT');
    res.json({ success: true, message: "Form updated successfully" });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error("❌ Error updating form and answers:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  } finally {
    client.release();
  }
});



module.exports = router;
