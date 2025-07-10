// 📄 scripts/viewAllActionPlansPage.js

const BASE_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://data-collection-system.onrender.com";

// ========================
// 🌍 Facility Map
// ========================
const facilityMap = {
  "Kotobabi": [
    "Anthon Memorial Hospital", "Anthon Memorial Hospital Annex", "Effan Victory Clinic", "Life View Medical Hospital", 
    "Anthon CHPS", "Bright Star CHPS", "Ebony Down CHPS", "Pigfarm CHPS", "Anthon Annex CHPS", "Great Gerraldo CHPS"
  ],
  "Accra New Town": [
    "Ghanuba Specialist Hospital", "Medylife Healthcare (Clinix)", "Mercy Ana’s Maternity Home", "Mission Clinic", 
    "Mustard Health Systems and", "Fertility Centre (Sape Agbo)", "Gift Medical Centre", "Apostolic CHPS", 
    "Mrs. Dua CHPS", "Ayidiki CHPS", "Wisdom CHPS"
  ],
  "Alajo": [
    "Alajo Community Clinic", "Unfolding Glory Medical Centre", "Alajo Park CHPS", "Delape CHPS", "High Tension CHPS", 
    "Pele CHPS", "Polo Park CHPS"
  ],
  "Kokomlemle": [
    "Entrance University Hospital", "Mallam Atta Government Clinic", "Mariestopes International Ghana", 
    "Salvation Army Anidasofie Clinic", "Holy Heights Clinic ", "Anidasofie CHPS", "De-youngsters CHPS", 
    "New Page CHPS", "Mallam Atta CHPS", "Tip Toe CHPS"
  ]
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
document.getElementById("searchBtn").addEventListener("click", () => fetchAndDisplayPlans(1));

let currentPage = 1;
const itemsPerPage = 5;

async function fetchAndDisplayPlans(page = 1) {
  currentPage = page;

  const sub_municipal = document.getElementById("sub_municipal").value;
  const facility_name = document.getElementById("facility_name").value;
  const quarter = document.getElementById("quarter").value;
  const monitoring_year = document.getElementById("monitoring_year").value;

  const queryParams = new URLSearchParams({ page, limit: itemsPerPage });

  if (sub_municipal) queryParams.append("sub_municipal", sub_municipal);
  if (facility_name) queryParams.append("facility_name", facility_name);
  if (quarter) queryParams.append("quarter", quarter);
  if (monitoring_year) queryParams.append("monitoring_year", monitoring_year);

  try {
    const res = await fetch(`${BASE_API_URL}/api/view-all-action-plans?${queryParams}`);
    const data = await res.json();

    if (data.success) {
      renderTable(data.plans);
      renderPagination(data.total, page);
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
function renderTable(plans) {
  const tbody = document.querySelector("#actionPlansTable tbody");
  tbody.innerHTML = "";

  plans.forEach((plan, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${(currentPage - 1) * itemsPerPage + index + 1}</td>
      <td>${plan.sub_municipal}</td>
      <td>${plan.facility_name}</td>
      <td>${plan.quarter}</td>
      <td>${plan.monitoring_year}</td>
      <td>${plan.date}</td>
      <td>${plan.supervisor_name}</td>
      <td>${plan.in_charge_name}</td>
      <td>
        <a href="editActionPlan.html?id=${plan.id}" class="edit-link">Edit</a> |
        <a href="viewActionPlans.html?id=${plan.id}" class="view-link">View</a> |
        <button onclick="printPlan(${plan.id})" class="print-btn">Print</button> |
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
  if (!paginationDiv) return;

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

// ====================
// 🖨 Print Action Plan
// ====================
function printPlan(id) {
  window.open(`printActionPlan.html?id=${id}`, "_blank");
}

// Initial fetch on load
window.onload = () => fetchAndDisplayPlans();