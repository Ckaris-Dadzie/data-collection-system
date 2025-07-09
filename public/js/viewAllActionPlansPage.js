// 📄 scripts/viewAllActionPlansPage.js

const BASE_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://data-collection-system.onrender.com";

// ========================
// 🌍 Facility Map
// ========================
const facilityMap = {
  "Kotobabi": ["Anthon", "Anness"],
  "Accra New Town": ["Ghanuba Specialist Hospital", "Medylife Healthcare (Clinix)", "Savana Hospital"],
  "Alajo": ["Richsound", "Konti"],
  "Kokomlemle": ["Jamesons", "Vine Clinic"]
};

// =============================
// 🛠 Populate Facility Dropdown
// =============================
document.getElementById("sub_municipal").addEventListener("change", function () {
  const subMunicipal = this.value;
  const facilityDropdown = document.getElementById("facility_name");
  facilityDropdown.innerHTML = '<option value="">Select Facility</option>';

  if (facilityMap[subMunicipal]) {
    facilityMap[subMunicipal].forEach(facility => {
      const option = document.createElement("option");
      option.value = facility;
      option.textContent = facility;
      facilityDropdown.appendChild(option);
    });
  }
});

// =============================
// 🔍 Fetch & Display Action Plans
// =============================
document.getElementById("searchBtn").addEventListener("click", fetchAndDisplayPlans);

let currentPage = 1;
const itemsPerPage = 5;

async function fetchAndDisplayPlans(page = 1) {
  const sub_municipal = document.getElementById("sub_municipal").value;
  const facility_name = document.getElementById("facility_name").value;
  const quarter = document.getElementById("quarter").value;
  const monitoring_year = document.getElementById("monitoring_year").value;

  const queryParams = new URLSearchParams({
    sub_municipal,
    facility_name,
    quarter,
    monitoring_year
  });

  try {
    const res = await fetch(`${BASE_API_URL}/api/view-all-action-plans?${queryParams}`);
    const data = await res.json();

    if (data.success) {
      renderTable(data.plans, page);
      renderPagination(data.plans.length, page);
    } else {
      alert("No action plans found.");
    }
  } catch (err) {
    console.error("❌ Error fetching plans:", err);
    alert("Failed to fetch action plans.");
  }
}

// ==========================
// 🖊 Render Table with Data
// ==========================
function renderTable(plans, page) {
  const tbody = document.querySelector("#actionPlansTable tbody");
  tbody.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const paginatedPlans = plans.slice(start, start + itemsPerPage);

  paginatedPlans.forEach((plan, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${start + index + 1}</td>
      <td>${plan.sub_municipal}</td>
      <td>${plan.facility_name}</td>
      <td>${plan.quarter}</td>
      <td>${plan.monitoring_year}</td>
      <td>${plan.date}</td>
      <td>${plan.supervisor_name}</td>
      <td>${plan.in_charge_name}</td>
      <td>
        <a href="editActionPlan.html?id=${plan.id}" class="edit-link">Edit</a> |
        <a href="viewActionPlan.html?id=${plan.id}" class="view-link">View</a> |
        <button onclick="deletePlan(${plan.id})" class="delete-btn">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// =====================
// 📚 Pagination Controls
// =====================
function renderPagination(totalItems, currentPage) {
  const paginationDiv = document.getElementById("pagination");
  paginationDiv.innerHTML = "";
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.toggle("active", i === currentPage);
    btn.addEventListener("click", () => fetchAndDisplayPlans(i));
    paginationDiv.appendChild(btn);
  }
}

// ====================
// ❌ Delete Action Plan
// ====================
async function deletePlan(id) {
  if (!confirm("Are you sure you want to delete this action plan?")) return;
  try {
    const res = await fetch(`${BASE_API_URL}/api/action-plan/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      alert("✅ Deleted successfully");
      fetchAndDisplayPlans(currentPage);
    } else {
      alert("❌ Delete failed");
    }
  } catch (err) {
    console.error("❌ Error deleting:", err);
    alert("Delete failed");
  }
}

// Initial fetch on load
window.onload = () => fetchAndDisplayPlans();
