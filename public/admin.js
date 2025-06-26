//Dropdow options for Sub Municipal and Facility Visited
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

const subMunicipalSelect = document.getElementById("filterSubMunicipal");
const facilitySelect = document.getElementById("filterFacility");

subMunicipalSelect.addEventListener("change", () => {
  const selected = subMunicipalSelect.value;
  facilitySelect.innerHTML = '<option value="">-- All --</option>';
  if (facilityMap[selected]) {
    facilityMap[selected].forEach(facility => {
      const option = document.createElement("option");
      option.value = facility;
      option.textContent = facility;
      facilitySelect.appendChild(option);
    });
  }
});


const searchBtn = document.getElementById("searchBtn");
const resultsBody = document.getElementById("resultsBody");

async function fetchForms() {
  const formType = document.getElementById("filterFormType").value;
  const year = document.getElementById("filterYear").value;
  const program = document.getElementById("filterProgram").value;
  const subMunicipal = subMunicipalSelect.value;
  const facility = facilitySelect.value;

  const params = new URLSearchParams();
  if (formType) params.append("form_type", formType);
  if (year) params.append("year", year);
  if (program) params.append("program", program);
  if (subMunicipal) params.append("sub_municipal", subMunicipal);
  if (facility) params.append("facility_visited", facility);

  try {
    const res = await fetch(`http://localhost:5000/api/admin?${params}`);
    const data = await res.json();

    if (data.success) {
      renderTable(data.forms);
    } else {
      alert("Failed to fetch forms.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

function renderTable(forms) {
  resultsBody.innerHTML = "";
  if (!forms.length) {
    resultsBody.innerHTML = `<tr><td colspan="4">No results found.</td></tr>`;
    return;
  }

  forms.forEach(form => {
    const row = document.createElement("tr");
    row.innerHTML = `
 
    <td>${form.id}</td>
  <td>${form.monitoring_number}</td> 
  <td>${form.form_type}</td>
  <td>${form.program}</td>
  <td>${form.organisation_name}</td>
  <td>${form.sub_municipal}</td>
  <td>${form.facility_visited}</td>
  <td>${form.respondents}</td>
  <td>${form.monitoring_team}</td>
  <td>${form.team_members}</td>
  <td>${new Date(form.created_at).toLocaleDateString()}</td>
  <td>
    <button onclick="viewForm(${form.id})">👁 View</button>
    <a href="edit.html?id=${form.id}">✏️ Edit</a>
    <button onclick="deleteForm(${form.id})">🗑 Delete</button>
  </td>
    `;
    resultsBody.appendChild(row);
  });
}

async function deleteForm(id) {
  if (!confirm("Are you sure you want to delete this form?")) return;

  try {
    const res = await fetch(`http://localhost:5000/api/admin/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (data.success) {
      alert("Form deleted.");
      fetchForms();
    } else {
      alert("Delete failed.");
    }
  } catch (err) {
    console.error("Delete error:", err);
  }
}

searchBtn.addEventListener("click", fetchForms);

// Load all by default
fetchForms();

// Function to load and display a form's full details in a modal
async function viewForm(id) {
  try {
    // Fetch form data from backend using form ID
    const res = await fetch(`http://localhost:5000/api/admin/${id}`);
    const data = await res.json(); // Convert response to JSON

    // If fetch failed, alert user and stop
    if (!data.success) {
      alert("❌ Failed to load form.");
      return;
    }

    // Destructure the returned form metadata and associated questions/answers
    const { form, questions } = data;

    // Build the HTML content to display in the modal
    const html = `
      <h2>📋 Form Details</h2>

      <!-- Metadata Section -->
      <h3>Metadata</h3>
      <table>
        <tr><td><strong>Monitoring #:</strong></td><td>${form.monitoring_number}</td></tr>
        <tr><td><strong>Form Type:</strong></td><td>${form.form_type}</td></tr>
        <tr><td><strong>Program:</strong></td><td>${form.program}</td></tr>
        <tr><td><strong>Organisation:</strong></td><td>${form.organisation_name}</td></tr>
        <tr><td><strong>Region:</strong></td><td>${form.region}</td></tr>
        <tr><td><strong>Sub-Municipal:</strong></td><td>${form.sub_municipal}</td></tr>
        <tr><td><strong>Facility Visited:</strong></td><td>${form.facility_visited}</td></tr>
        <tr><td><strong>Location:</strong></td><td>${form.location}</td></tr>
        <tr><td><strong>Respondents:</strong></td><td>${form.respondents}</td></tr>
        <tr><td><strong>Monitoring Team:</strong></td><td>${form.monitoring_team}</td></tr>
        <tr><td><strong>Team Members:</strong></td><td>${form.team_members}</td></tr>
      </table>

      <!-- Introduction Questions Section -->
      <h3>📝 Introduction Questions</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Remark</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          ${
            // Loop through all questions and display them in rows
            questions.map((q, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${q.question_text}</td>
                <td>${q.answer || ''}</td>
                <td>${q.remark || ''}</td>
                <td>${q.score || ''}</td>
              </tr>
            `).join("") // Join all rows into one HTML string
          }
        </tbody>
      </table>

      <!-- General Comments Section -->
      <h3>🗒 General Comments</h3>
      <p>${form.general_comments}</p>
    `;

    // Inject the HTML into the modal container
    document.getElementById("modalContent").innerHTML = html;

    // Display the modal
    document.getElementById("viewModal").style.display = "flex";

  } catch (err) {
    // Log error and notify user
    console.error("❌ Error loading form:", err);
    alert("Error fetching form details.");
  }
}

// Function to close/hide the modal
function closeModal() {
  document.getElementById("viewModal").style.display = "none";
}

