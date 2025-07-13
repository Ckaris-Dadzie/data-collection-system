// 🌍 API Base
const BASE_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://data-collection-system.onrender.com";

// 📤 Handle Register Form Submission
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const full_name = document.getElementById("full_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  // 🔐 Simple validation
  if (!full_name || !email || !password || !role) {
    return alert("❌ All fields are required.");
  }

  try {
    const res = await fetch(`${BASE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, email, password, role })
    });

    const data = await res.json();
    const messageDiv = document.getElementById("registerMessage");

    if (data.success) {
      messageDiv.style.color = "green";
      messageDiv.textContent = "✅ Registration successful! You can now log in.";
      document.getElementById("registerForm").reset();
    } else {
      messageDiv.style.color = "red";
      messageDiv.textContent = `❌ ${data.message}`;
    }
  } catch (err) {
    console.error("Registration error:", err);
    alert("❌ Registration failed. Please try again.");
  }
});
