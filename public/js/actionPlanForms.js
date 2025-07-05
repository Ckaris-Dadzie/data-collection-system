
// 🌍 Mapping: Sub-Municipal ➡ Facility List
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

document.getElementById("sub_municipal").addEventListener("change", function () {
  const subMunicipal = this.value;
  const facilitySelect = document.getElementById("facility_name");

  // Clear current options
  facilitySelect.innerHTML = '<option value="">-- Select Facility --</option>';

  // Populate new options
  if (facilityMap[subMunicipal]) {
    facilityMap[subMunicipal].forEach(facility => {
      const option = document.createElement("option");
      option.value = facility;
      option.textContent = facility;
      facilitySelect.appendChild(option);
    });
  }
});


// ==========================
// 📤 Submit Action Plan Form
// ==========================
const BASE_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://data-collection-system.onrender.com";

document.getElementById("actionPlanForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const actions = [];
  const rows = document.querySelectorAll("#actionsTable tbody tr");

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input, textarea");
    actions.push({
      clinical_area: inputs[0].value,
      challenges: inputs[1].value,
      proposed_changes: inputs[2].value,
      indicator: inputs[3].value,
      time_frame: inputs[4].value,
      person_responsible: inputs[5].value,
      resources: inputs[6].value,
      next_assessment: inputs[7].value
    });
  });

  const payload = {
    sub_municipal: document.getElementById("sub_municipal").value,
    facility_name: document.getElementById("facility_name").value,
    quarter: document.getElementById("quarter").value,
    monitoring_year: document.getElementById("monitoring_year").value,
    date: document.getElementById("date").value,
    supervisor_name: document.getElementById("supervisor_name").value,
    in_charge_name: document.getElementById("in_charge_name").value,
    actions
  };


  console.log("📤 Submitting payload:", payload);

  try {
    const res = await fetch(`${BASE_API_URL}/api/action-plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Action plan submitted!");
      location.reload();
    } else {
      alert("❌ Failed to submit action plan.");
    }
  } catch (err) {
    console.error("❌ Error:", err);
    alert("❌ Network error.");
  }
});

// ==========================
// ➕ Add a New Action Row
// ==========================
function addActionRow() {
  const tableBody = document.querySelector("#actionsTable tbody");

  // Create a new row element
  const newRow = document.createElement("tr");

  // Set inner HTML for the new row with empty input fields
  newRow.innerHTML = `
    <td class="row-number"></td>
    <td><input type="text" /></td>
    <td><textarea></textarea></td>
    <td><textarea></textarea></td>
    <td><input type="text" /></td>
    <td><input type="text" /></td>
    <td><input type="text" /></td>
    <td><input type="text" /></td>
    <td><input type="date" /></td>
    <td><button type="button" class="btn btn-remove" onclick="removeActionRow(this)">🗑️</button></td>
  `;

  // Append the new row to the table
  tableBody.appendChild(newRow);

  // Renumber all rows after adding
  updateRowNumbers();
}

// ==========================
// ❌ Remove a Row from Table
// ==========================
function removeActionRow(button) {
  // Remove the row containing the clicked delete button
  const row = button.closest("tr");
  row.remove();

  // Renumber remaining rows
  updateRowNumbers();
}

// ==========================
// 🔢 Update Row Numbering
// ==========================
function updateRowNumbers() {
  const rows = document.querySelectorAll("#actionsTable tbody tr");
  rows.forEach((row, index) => {
    row.querySelector(".row-number").textContent = index + 1;
  });
}
