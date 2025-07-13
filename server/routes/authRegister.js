// 📁 routes/authRegister.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");

// ✅ POST /api/auth/register — Register a new user
router.post("/", async (req, res) => {
  const { full_name, email, password, role } = req.body;

  // 🔍 Validate required fields
  if (!full_name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    // ❌ Check if email already exists
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ success: false, message: "User already registered with this email." });
    }

    // 🔐 Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save new user to DB
    await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)`,
      [full_name, email, hashedPassword, role]
    );

    res.status(201).json({ success: true, message: "User registered successfully." });

  } catch (err) {
    console.error("❌ Error during registration:", err.message);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

module.exports = router;
