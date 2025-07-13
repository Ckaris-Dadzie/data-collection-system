
const BASE_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://data-collection-system.onrender.com";

// 🗺 Facility map: maps each sub-municipal to its facilities
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

// 🎯 Auto-run on load to get ID from URL and fetch details
window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const planId = urlParams.get("id");

  if (!planId) {
    document.getElementById("results").innerHTML = "<p>❌ No Action Plan ID provided in URL.</p>";
    return;
  }

  try {
    const res = await fetch(`${BASE_API_URL}/api/action-plan/${planId}`);
    const data = await res.json();

    if (!data.success || !data.plan) {
      document.getElementById("results").innerHTML = "<p>❌ Action plan not found.</p>";
      return;
    }

    const plan = data.plan;

    // 🎨 Build the result HTML
    let html = `
      <h1>📋 AYAWASO CENTRAL MUNICIPAL HEALTH DIRECTORATE</h1>
      <h2 style="text-align: center;font-size:30px; margin-top:-20px">
      📌 ACTION PLAN FOR ISS "<strong>${plan.quarter}</strong>"  ${plan.monitoring_year}</h2>

      <div style="display: flex; justify-content: center;gap:30px; text-align: center; font-size: 18px; margin-top:-30px"> 
      <p><strong>Sub-Municipal:</strong> ${plan.sub_municipal}</p>
      <p><strong>Facility Name:</strong> ${plan.facility_name}</p>
      <p><strong>Date:</strong> ${plan.date}</p>
      </div>

      <div style="display: flex; justify-content: center;gap:30px; text-align: center; font-size: 18px; margin-top:-30px">
      <p><strong>Supervisor:</strong> ${plan.supervisor_name}</p>
      <p><strong>Sign:</strong>....................</p>
      <p><strong>Facility In-Charge:</strong> ${plan.in_charge_name}</p>
      <p><strong>Sign:</strong>....................</p>
      </div>

      <h3>🛠 Action Items</h3>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Clinical Area</th>
            <th>Challenges</th>
            <th>Proposed Changes</th>
            <th>Indicator</th>
            <th>Time Frame</th>
            <th>Responsible</th>
            <th>Resources</th>
            <th>Next Assessment</th>
          </tr>
        </thead>
        <tbody>
    `;

    // ✅ Render each action item from plan.actions
    (plan.actions || []).forEach((item, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.clinical_area}</td>
          <td>${item.challenges}</td>
          <td>${item.proposed_changes}</td>
          <td>${item.indicator}</td>
          <td>${item.time_frame}</td>
          <td>${item.person_responsible}</td>
          <td>${item.resources}</td>
          <td>${item.next_assessment}</td>
        </tr>`;
    });

    html += `</tbody></table>`;

    html += `
      <br>
      <button onclick="printSection()">🖨️ Print This Result</button>
      <button onclick="editActionPlan(${plan.id})">✏️ Edit</button>
      <button onclick="deleteActionPlan(${plan.id})">🗑️ Delete</button>
      <a href="viewAllActionPlans.html" style="margin-left: 15px; font-weight: bold; text-decoration: underline;">⬅️ Back to All Action Plans</a>
    `;

    document.getElementById("results").innerHTML = html;

  } catch (err) {
    console.error("❌ Error loading action plan:", err);
    document.getElementById("results").innerHTML = "<p>❌ Failed to load action plan.</p>";
  }
};

// 🖨️ Print only the results section
function printSection() {
  const content = document.getElementById("results").innerHTML;
  const original = document.body.innerHTML;

  document.body.innerHTML = content;
  window.print();
  document.body.innerHTML = original;
  window.location.reload(); // Reload to restore original content
}

// ✏️ Redirect to editActionPlan.html with query param
function editActionPlan(planId) {
  window.location.href = `editActionPlan.html?id=${planId}`;
}

// 🗑️ Delete an action plan entry
async function deleteActionPlan(planId) {
  if (!confirm("Are you sure you want to delete this action plan?")) return;

  try {
    const res = await fetch(`${BASE_API_URL}/api/action-plan/${planId}`, {
      method: "DELETE",
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Action plan deleted.");
      document.getElementById("results").innerHTML = "";
    } else {
      alert("❌ Failed to delete.");
    }
  } catch (err) {
    console.error("❌ Delete error:", err);
    alert("❌ Network error during delete.");
  }
}
