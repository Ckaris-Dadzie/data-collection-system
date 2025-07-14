// ✅ index.js loaded and running
// server/index.js
const express = require('express');
const cors = require('cors');
const pool = require('./db'); // PostgreSQL connection
const formRoutes = require('./routes/forms');
const adminRoutes = require('./routes/admin');
const actionPlanRoutes = require('./routes/actionPlan');
const editActionPlanRoutes = require('./routes/editActionPlan'); // 👈 Add this
const viewAllActionPlansRoute = require('./routes/viewAllActionPlans');
const authRoutes = require('./routes/auth');
const authRegister = require("./routes/authRegister");




const app = express();

// 🔓 Enable CORS for all routes
app.use(cors());

// 🧠 Parse incoming JSON payloads
app.use(express.json());

// 📦 Mount form-related routes
app.use('/api/forms', formRoutes);

//for action plan 
app.use('/api/action-plan', actionPlanRoutes);

//for edit action plan
app.use('/api/edit-action-plan', editActionPlanRoutes); // 👈 Add this

//for view all action plans
app.use('/api/view-all-action-plans', viewAllActionPlansRoute);

//for authentication
app.use('/api/auth', authRoutes); 

//for registration
app.use("/api/auth/register", authRegister);

// 🛠 Mount admin-related routes
app.use('/api/admin', adminRoutes);

// ⚠️ Catch unhandled routes (404 Not Found)
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ❌ Global error handler (optional, but helpful during dev)
app.use((err, req, res, next) => {
  console.error('💥 Internal Server Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("🚦 Server started and ready to receive requests");
});

// Test route for debugging
app.get('/test', (req, res) => {
  console.log("✅ /test route hit");
  res.json({ success: true });
});
