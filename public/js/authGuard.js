// 📁 public/js/authGuard.js

(function () {
  // ✅ Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  // ✅ Get current page
  const currentPage = window.location.pathname;

  if (!user || !role) {
    alert("🚫 Please log in to continue.");
    window.location.href = "login.html";
    return;
  }

  // ✅ Restrict page based on role
  if (currentPage.includes("admin.html") && role !== "admin") {
    alert("🚫 You are not authorized to access this page.");
    window.location.href = "index.html";
    return;
  }

  if (currentPage.includes("supervisor.html") && role !== "supervisor") {
    alert("🚫 You are not authorized to access this page.");
    window.location.href = "index.html";
    return;
  }

  if (currentPage.includes("users.html") && role !== "admin") {
    alert("🚫 Only admins can manage users.");
    window.location.href = "index.html";
    return;
  }

  // (optional) Show role on the page
  const roleBadge = document.getElementById("roleBadge");
  if (roleBadge) {
    roleBadge.textContent = role;
  }
})();
