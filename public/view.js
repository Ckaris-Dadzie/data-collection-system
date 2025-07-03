// 🔁 Facility mapping by Sub-Municipal
const facilityMap = {
  "Kotobabi": ["Anthon Memorial Hospital", "Anthon Memorial Hospital Annex", "Effan Victory Clinic", "Life View Medical Hospital", 
              "Anthon CHPS", "Bright Star CHPS", "Ebony Down CHPS", "Pigfarm CHPS", "Anthon Annex CHPS", "Great Gerraldo CHPS"
              ],

  "Accra New Town": ["Ghanuba Specialist Hospital", "Medylife Healthcare (Clinix)", "Mercy Ana’s Maternity Home", "Mission Clinic", 
                    "Mustard Health Systems and", "Fertility Centre (Sape Agbo)", "Gift Medical Centre", "Apostolic CHPS", 
                    "Mrs. Dua CHPS", "Ayidiki CHPS", "Wisdom CHPS"
                    ],

  "Alajo": ["Alajo Community Clinic", "Unfolding Glory Medical Centre", "Alajo Park CHPS", "Delape CHPS", "High Tension CHPS", 
            "Pele CHPS", "Polo Park CHPS"
          ],

  "Kokomlemle": ["Entrance University Hospital", "Mallam Atta Government Clinic", "Mariestopes International Ghana", 
                "Salvation Army Anidasofie Clinic", "Holy Heights Clinic ", "Anidasofie CHPS", "De-youngsters CHPS", 
                "New Page CHPS", "Mallam Atta CHPS", "Tip Toe CHPS"
                ]
};

// 🔁 Update facilities dropdown when Sub-Municipal changes
document.getElementById("subMunicipalFilter").addEventListener("change", () => {
  const subMunicipal = document.getElementById("subMunicipalFilter").value;
  const facilitySelect = document.getElementById("facilityVisitedFilter");

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



const BASE_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://data-collection-system.onrender.com";

// 🔁 Handle Search button click
document.getElementById("searchBtn").addEventListener("click", async () => {
  const formType = document.getElementById("formTypeFilter").value;
  const monitoringNumber = document.getElementById("monitoringNumberFilter").value;
  const program = document.getElementById("programFilter").value;
  const subMunicipal = document.getElementById("subMunicipalFilter").value;
  const facilityVisited = document.getElementById("facilityVisitedFilter").value;

  // Build query params
  const params = new URLSearchParams({
    form_type: formType,
    monitoring_number: monitoringNumber,
    program,
    sub_municipal: subMunicipal,
    facility_visited: facilityVisited
  });

  try {
    const res = await fetch(`http://localhost:5000/api/forms/search?${params}`);
    const data = await res.json();

    if (data.success && data.forms.length > 0) {
      displayResults(data.forms[0], data.questions);
    } else {
      displayNoResults();
    }
  } catch (err) {
    console.error("❌ Fetch error:", err);
    displayError();
  }
});

// 🔁 Display "No Results Found" message
function displayNoResults() {
  document.getElementById("metadataSection").innerHTML = "";
  document.getElementById("questionsSection").innerHTML = "";
  document.getElementById("commentsSection").innerHTML = "<p style='color:red;'>No results found.</p>";
}

// 🔁 Display error message
function displayError() {
  document.getElementById("metadataSection").innerHTML = "";
  document.getElementById("questionsSection").innerHTML = "";
  document.getElementById("commentsSection").innerHTML = "<p style='color:red;'>Error fetching form data.</p>";
}

// 🔁 Display full form (metadata + questions + comments)
function displayResults(form, questions) {
  // ▶️ Render metadata
  document.getElementById("metadataSection").innerHTML = `
    <h2>Metadata</h2>
    <table>
      <tr><th>Monitoring Number</th><td>${form.monitoring_number}</td></tr>
      <tr><th>Name of Organisation</th><td>${form.organisation_name}</td></tr>
      <tr><th>Name of Project</th><td>${form.project_name}</td></tr>
      <tr><th>Program</th><td>${form.program}</td></tr>
      <tr><th>Region</th><td>${form.region}</td></tr>
      <tr><th>Sub Municipal</th><td>${form.sub_municipal}</td></tr>
      <tr><th>Facility Visited</th><td>${form.facility_visited}</td></tr>
      <tr><th>Location</th><td>${form.location}</td></tr>
      <tr><th>Monitoring Team</th><td>${form.monitoring_team}</td></tr>
      <tr><th>Team Members</th><td>${form.team_members}</td></tr>
      <tr><th>Respondent(s)</th><td>${form.respondents}</td></tr>
    </table>
  `;

  // ▶️ Render introduction questions
  if (questions.length > 0) {
    const rows = questions.map(q => `
      <tr>
        <td>${q.question_number}</td>
        <td>${q.question_text}</td>
        <td>${q.answer || ""}</td>
        <td>${q.remark || ""}</td>
        <td>${q.score !== null && q.score !== undefined ? q.score : ""}</td>
      </tr>
    `).join("");

    document.getElementById("questionsSection").innerHTML = `
      <h2>Introduction</h2>
      <table>
        <thead>
          <tr>
            <th>Qst. No.</th>
            <th>Question</th>
            <th>Yes/No/NA</th>
            <th>Remarks</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  } else {
    document.getElementById("questionsSection").innerHTML = "<p>No introduction questions recorded.</p>";
  }

  // ▶️ Render general comments
  document.getElementById("commentsSection").innerHTML = `
    <h2>General Comments</h2>
    <div class="general-comments">
      ${form.general_comments || "No comments provided."}
    </div>
  `;
}
