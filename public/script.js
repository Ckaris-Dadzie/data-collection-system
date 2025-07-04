// 1. Facility mapping
const facilities = {
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

// 🔁 Smart backend base URL
const BASE_API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:5000"
  : "https://data-collection-system.onrender.com";

// 2. DOM references
const subMunicipal = document.getElementById("subMunicipal");
const facilityVisited = document.getElementById("facility_visited");
const locationField = document.getElementById("location");
const programSelect = document.getElementById("program");
const questionContainer = document.getElementById("questionsTableBody");

// 3. Update facility dropdown and location field based on Sub-Municipal
subMunicipal.addEventListener("change", () => {
  const selected = subMunicipal.value;
  locationField.value = selected;
  facilityVisited.innerHTML = "";

  if (facilities[selected]) {
    facilities[selected].forEach(fac => {
      const opt = document.createElement("option");
      opt.value = fac;
      opt.textContent = fac;
      facilityVisited.appendChild(opt);
    });
  }
});

// 4. Generate question table dynamically
function generateQuestions(questions) {
  questionContainer.innerHTML = ""; // Clear old questions

  const table = document.createElement("table");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Qst. No.</th>
      <th>Question</th>
      <th>Answer</th>
      <th>Remarks</th>
      <th>Score</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  questions.forEach((q, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="question-number">${q.question_number || index + 1}</td>
      <td class="question-text">
        <input type="hidden" name="question_id_${index}" value="${q.id}" />
        ${q.question_text}
      </td>
      <td>
        <select name="answer_${index}">
          <option value="">--Select--</option>
          <option>Yes</option>
          <option>No</option>
          <option>NA</option>
        </select>
      </td>
      <td>
        <select name="remarks_${index}">
          <option value="">--Select--</option>
          <option>Poor</option>
          <option>Credit</option>
          <option>Good</option>
          <option>Better</option>
          <option>Excellent</option>
        </select>
      </td>
      <td>
        <select name="score_${index}">
          <option value="">--Select--</option>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </td>
    `;
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  questionContainer.appendChild(table);
}

// 5. Load questions from backend when program changes
programSelect.addEventListener("change", () => {
  const selectedProgram = programSelect.value;
  if (!selectedProgram) return;

  fetch(`${BASE_API_URL}/api/forms/questions/${encodeURIComponent(selectedProgram)}`)
    .then(res => res.json())
    .then(questions => {
      if (questions.length > 0) {
        generateQuestions(questions);
      } else {
        questionContainer.innerHTML = "<p style='color:red;'>No questions available for this program yet.</p>";
      }
    })
    .catch(err => {
      console.error("❌ Error loading questions:", err);
      questionContainer.innerHTML = "<p style='color:red;'>Failed to load questions.</p>";
    });
});

// 6. Submit form with metadata + answers
document.getElementById("dataForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // ✅ Validate metadata
  if (
    !data.monitoring_number ||
    !data.form_type ||
    !data.program ||
    !data.sub_municipal ||
    !data.facility_visited ||
    !data.respondents ||
    !data.team_members
  ) {
    alert("❌ Please fill all required metadata fields in Step 1.");
    return;
  }

  // ✅ Validate general comments
  if (!data.general_comments || data.general_comments.trim() === "") {
    alert("❌ Please enter general comments in Step 3.");
    return;
  }

  // ✅ Collect and validate answers
  const questionRows = document.querySelectorAll("#questionsTableBody table tbody tr");
  const answers = [];

  let hasErrors = false;
  let firstInvalidRow = null;

  questionRows.forEach((row, index) => {
    const question_id = row.querySelector('input[type="hidden"]')?.value;
    const answer = row.querySelector(`[name="answer_${index}"]`)?.value;
    const remark = row.querySelector(`[name="remarks_${index}"]`)?.value;
    const score = row.querySelector(`[name="score_${index}"]`)?.value;

    if (!answer || !remark || !score) {
      hasErrors = true;
      row.style.border = "2px solid red";
      if (!firstInvalidRow) firstInvalidRow = row;
    } else {
      row.style.border = "";
    }

    console.log({ question_id, answer, remark, score });
    answers.push({
      question_id: parseInt(question_id),
      answer,
      remark,
      score
    });
  });

  if (questionRows.length > 0 && hasErrors) {
    alert("❌ Please complete all questions (Answer, Remark, and Score).");
    if (firstInvalidRow) {
      firstInvalidRow.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  // 🔄 Prepare payload
  const payload = {
    ...data,
    answers,
  };

  // ✅ Submit to backend
  console.log("Payload to send:", payload);
  try {
    const res = await fetch(`${BASE_API_URL}/api/forms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (result.success) {
      alert("✅ Form and answers submitted successfully!");
      this.reset();
      questionContainer.innerHTML = "";
    } else {
      throw new Error(result.message || "Submission failed.");
    }
  } catch (err) {
    console.error("❌ Error submitting form:", err);
    alert("❌ Error submitting form. Check console for details.");
  }
});
