// 🌐 Smart Backend URL
const BASE_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://data-collection-system.onrender.com";

// 🔐 Login Form Submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    document.getElementById("loginMessage").textContent = "❌ Please fill in both fields.";
    return;
  }

  try {
    const res = await fetch(`${BASE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (result.success) {
      // ✅ Store token and user in localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      // ✅ Redirect based on role
      if (result.user.role === "admin") {
        window.location.href = "admin.html";
      } else if (result.user.role === "supervisor") {
        window.location.href = "actionPlan.html";
      } else {
        window.location.href = "index.html"; // default user
      }
    } else {
      document.getElementById("loginMessage").textContent = result.message || "Login failed.";
    }
  } catch (err) {
    console.error("❌ Login Error:", err);
    document.getElementById("loginMessage").textContent = "❌ Login request failed.";
  }
});


// ✅ Example: login.js (after successful login)
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(`${BASE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
      // ✅ Store user info and token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user object as string
      localStorage.setItem("role", data.user.role); // Optional shortcut for quick access

      alert("✅ Login successful!");

      // 🔁 Redirect based on role
      if (data.user.role === "admin") {
        window.location.href = "admin.html";
      } else if (data.user.role === "supervisor") {
        window.location.href = "supervisor.html";
      } else {
        window.location.href = "index.html"; // regular user
      }
    } else {
      alert("❌ " + data.message);
    }

  } catch (err) {
    console.error("❌ Login Error:", err);
    alert("Login failed. Please try again.");
  }
});
