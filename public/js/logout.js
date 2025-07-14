// 📄 public/js/logout.js

// ✅ Display user's name if logged in
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userDisplay = document.getElementById("userNameDisplay");

  if (user && userDisplay) {
    userDisplay.textContent = `Welcome, ${user.full_name}`;
  }

  // ✅ Attach logout handler if button exists
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      alert("👋 Logged out successfully.");
      window.location.href = "login.html";
    });
  }
});
