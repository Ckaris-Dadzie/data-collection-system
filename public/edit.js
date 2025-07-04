// ==========================
// 🏥 Facility Mapping
// ==========================
const facilityMap = {
  "Kotobabi": ["Anthon Memorial Hospital", "Anthon Memorial Hospital Annex", "Effan Victory Clinic", "Life View Medical Hospital", 
              "Anthon CHPS", "Bright Star CHPS", "Ebony Down CHPS", "Pigfarm CHPS", "Anthon Annex CHPS", "Great Gerraldo CHPS"],
  "Accra New Town": ["Ghanuba Specialist Hospital", "Medylife Healthcare (Clinix)", "Mercy Ana’s Maternity Home", "Mission Clinic", 
                    "Mustard Health Systems and", "Fertility Centre (Sape Agbo)", "Gift Medical Centre", "Apostolic CHPS", 
                    "Mrs. Dua CHPS", "Ayidiki CHPS", "Wisdom CHPS"],
  "Alajo": ["Alajo Community Clinic", "Unfolding Glory Medical Centre", "Alajo Park CHPS", "Delape CHPS", "High Tension CHPS", 
            "Pele CHPS", "Polo Park CHPS"],
  "Kokomlemle": ["Entrance University Hospital", "Mallam Atta Government Clinic", "Mariestopes International Ghana", 
                "Salvation Army Anidasofie Clinic", "Holy Heights Clinic ", "Anidasofie CHPS", "De-youngsters CHPS", 
                "New Page CHPS", "Mallam Atta CHPS", "Tip Toe CHPS"]
};

// ==========================
// 🌐 API Base URL (Local vs. Hosted)
// ==========================
const BASE_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://data-collection-system.onrender.com";

// ==========================
// 📋 List of Project Names (15 forms)
// ==========================
const projectNames = [
  "Clinical Care", "Nutrition Services", "Expanded Program of Immunisation, Surveillance and Tuberculosis",
  "Health Promotion", "Financial Management", "Reproductive and Child Health", "Management of Stores and Supplies",
  "Quality Assurance", "Standards, Protocols and Guidelines", "Management Practice", "Malaria Elimination",
  "HIV/AIDS Control", "Health Information Management", "Mental Health", "CHPS/MCHNP"
];

// ==========================
// 🔄 Populate Project Name Dropdown
// ==========================
const projectSelect = document.getElementById("project_name");
projectSelect.innerHTML = '<option value="">-- Select Project --</option>';
projectNames.forEach(name => {
  const option = document.createElement("option");
  option.value = name;
  option.textContent = name;
  projectSelect.appendChild(option);
});

// ==========================
// 🔄 Populate Facility Visited (Search Filter Dropdown)
// ==========================
document.getElementById("subMunicipalSearch").addEventListener("change", () => {
  const selectedSub = document.getElementById("subMunicipalSearch").value;
  const facilitySearch = document.getElementById("facilityVisitedSearch");

  facilitySearch.innerHTML = '<option value="">-- Select Facility --</option>';
  if (facilityMap[selectedSub]) {
    facilityMap[selectedSub].forEach(fac => {
      const option = document.createElement("option");
      option.value = fac;
      option.textContent = fac;
      facilitySearch.appendChild(option);
    });
  }
});

// ==========================
// 🏥 Auto-Populate Facilities & Location on Sub-Municipal Change (Edit Form)
// ==========================
document.getElementById("sub_municipal").addEventListener("change", () => {
  const subMunicipal = document.getElementById("sub_municipal").value;
  const facilitySelect = document.getElementById("facility_visited");
  const locationInput = document.getElementById("location");

  locationInput.value = subMunicipal;

  facilitySelect.innerHTML = '<option value="">-- Select Facility --</option>';
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
// 🔍 Load Form Based on Search Filters
// ==========================
document.getElementById("loadBtn").addEventListener("click", async () => {
  const formType = document.getElementById("formTypeSearch").value;
  const monitoringNumber = document.getElementById("monitoringNumberSearch").value;
  const program = document.getElementById("programSearch").value;
  const subMunicipal = document.getElementById("subMunicipalSearch").value;
  const facilityVisited = document.getElementById("facilityVisitedSearch").value;

  if (!formType || !monitoringNumber || !program) {
    alert("❌ Please enter Monitoring Number, Form Type, and Program.");
    return;
  }

  try {
    const params = new URLSearchParams({
      form_type: formType,
      monitoring_number: monitoringNumber,
      program,
      sub_municipal: subMunicipal,
      facility_visited: facilityVisited
    });

    const response = await fetch(`${BASE_API_URL}/api/forms/search?${params}`);
    const data = await response.json();

    if (data.success && data.forms.length > 0) {
      populateFormForEditing(data.forms[0], data.questions);
    } else {
      alert("❌ No form found matching your criteria.");
    }
  } catch (error) {
    console.error("❌ Error fetching form:", error);
    alert("❌ Error loading form data.");
  }
});


// ==========================
// 🧩 Populate Form for Editing (Updated to disable question editing)
// ==========================
function populateFormForEditing(form, questions) {
  document.getElementById("editForm").style.display = "block";
  window.currentFormId = form.id;

  document.getElementById("organisation_name").value = form.organisation_name;
  document.getElementById("project_name").value = form.project_name;
  document.getElementById("programSearch").value = form.program;
  document.getElementById("region").value = form.region;
  document.getElementById("sub_municipal").value = form.sub_municipal;

  const facilitySelect = document.getElementById("facility_visited");
  facilitySelect.innerHTML = '<option value="">-- Select Facility --</option>';
  if (facilityMap[form.sub_municipal]) {
    facilityMap[form.sub_municipal].forEach(fac => {
      const option = document.createElement("option");
      option.value = fac;
      option.textContent = fac;
      facilitySelect.appendChild(option);
    });
  }
  facilitySelect.value = form.facility_visited;

  document.getElementById("location").value = form.location;
  document.getElementById("respondents").value = form.respondents;
  document.getElementById("monitoring_team").value = form.monitoring_team;
  document.getElementById("team_members").value = form.team_members;
  document.getElementById("general_comments").value = form.general_comments;

  const container = document.getElementById("questionEditSection");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>Qst. No.</th>
        <th>Question</th>
        <th>Answer</th>
        <th>Remarks</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      ${questions.map(q => `
        <tr class="question-row" data-question-id="${q.question_id}">
          <td>${q.question_number}</td>
          <td>${q.question_text}</td>
          <td>
            <select class="answer-select" disabled>
              <option ${q.answer === "Yes" ? "selected" : ""}>Yes</option>
              <option ${q.answer === "No" ? "selected" : ""}>No</option>
              <option ${q.answer === "NA" ? "selected" : ""}>NA</option>
            </select>
          </td>
          <td>
            <select class="remark-select" disabled>
              <option ${q.remark === "Poor" ? "selected" : ""}>Poor</option>
              <option ${q.remark === "Credit" ? "selected" : ""}>Credit</option>
              <option ${q.remark === "Good" ? "selected" : ""}>Good</option>
              <option ${q.remark === "Better" ? "selected" : ""}>Better</option>
              <option ${q.remark === "Excellent" ? "selected" : ""}>Excellent</option>
            </select>
          </td>
          <td>
            <select class="score-select" disabled>
              ${[0, 1, 2, 3, 4, 5].map(s => `<option ${q.score == s ? "selected" : ""}>${s}</option>`).join("")}
            </select>
          </td>
        </tr>
      `).join("")}
    </tbody>
  `;
  container.appendChild(table);
}

// ==========================
// 📝 Handle Update (PUT) – Now skips answers
// ==========================
document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!window.currentFormId) {
    alert("❌ No form loaded to update.");
    return;
  }

  const formData = new FormData(e.target);
  const metadata = Object.fromEntries(formData.entries());

  const payload = {
    monitoring_number: metadata.monitoring_number || document.getElementById("monitoringNumberSearch").value,
    form_type: document.getElementById("formTypeSearch").value,
    program: document.getElementById("programSearch").value,
    organisation_name: metadata.organisation_name,
    project_name: document.getElementById("project_name").value,
    region: metadata.region,
    sub_municipal: metadata.sub_municipal,
    facility_visited: metadata.facility_visited,
    location: metadata.location,
    respondents: metadata.respondents,
    monitoring_team: metadata.monitoring_team,
    team_members: metadata.team_members,
    general_comments: metadata.general_comments,
    
  };

  try {
    const res = await fetch(`${BASE_API_URL}/api/forms/${window.currentFormId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (result.success) {
      alert("✅ Form metadata and comments updated successfully!");
    } else {
      alert("❌ Failed to update form.");
    }
  } catch (err) {
    console.error("❌ Network error:", err);
    alert("❌ Error updating form. Check console.");
  }
});
