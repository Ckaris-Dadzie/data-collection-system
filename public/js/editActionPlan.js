
document.addEventListener("DOMContentLoaded", () => {
  // 🌍 Base API URL (for local vs. production)
  const BASE_API_URL = window.location.hostname.includes("localhost")
    ? "http://localhost:5000"
    : "https://data-collection-system.onrender.com";

  // 🔗 DOM references for Search section
  const searchSubMunicipal = document.getElementById("search_sub_municipal");
  const searchFacility = document.getElementById("search_facility");
  const searchQuarter = document.getElementById("search_quarter");
  const searchYear = document.getElementById("search_year");
  const searchBtn = document.getElementById("searchBtn");

  // 🔗 DOM references for Edit form section
  const form = document.getElementById("editActionPlanForm");
  const subMunicipalSelect = document.getElementById("sub_municipal");
  const facilitySelect = document.getElementById("facility");
  const quarterSelect = document.getElementById("quarter");
  const yearInput = document.getElementById("monitoring_year");
  const dateInput = document.getElementById("date");
  const supervisorInput = document.getElementById("supervisor");
  const inchargeInput = document.getElementById("incharge");
  const hiddenIdInput = document.getElementById("action_plan_id");
  const editSection = document.getElementById("editSection");

  const actionTableBody = document.querySelector("#actionTable tbody");
  const addRowBtn = document.getElementById("addRowBtn");

  // 🗺 Facility Map
  const facilityMap = {
    "Kotobabi": ["Anthon Memorial Hospital", "Anthon Memorial Hospital Annex", "Effan Victory Clinic", "Life View Medical Hospital", "Anthon CHPS", "Bright Star CHPS", "Ebony Down CHPS", "Pigfarm CHPS", "Anthon Annex CHPS", "Great Gerraldo CHPS"],
    "Accra New Town": ["Ghanuba Specialist Hospital", "Medylife Healthcare (Clinix)", "Mercy Ana’s Maternity Home", "Mission Clinic", "Mustard Health Systems and", "Fertility Centre (Sape Agbo)", "Gift Medical Centre", "Apostolic CHPS", "Mrs. Dua CHPS", "Ayidiki CHPS", "Wisdom CHPS"],
    "Alajo": ["Alajo Community Clinic", "Unfolding Glory Medical Centre", "Alajo Park CHPS", "Delape CHPS", "High Tension CHPS", "Pele CHPS", "Polo Park CHPS"],
    "Kokomlemle": ["Entrance University Hospital", "Mallam Atta Government Clinic", "Mariestopes International Ghana", "Salvation Army Anidasofie Clinic", "Holy Heights Clinic ", "Anidasofie CHPS", "De-youngsters CHPS", "New Page CHPS", "Mallam Atta CHPS", "Tip Toe CHPS"]
  };

  // 🔄 Populate facility dropdown based on sub-municipal
  function updateFacilityDropdown(selectElement, subMunicipal) {
    selectElement.innerHTML = `<option value="">Select Facility</option>`;
    if (facilityMap[subMunicipal]) {
      facilityMap[subMunicipal].forEach(fac => {
        const option = document.createElement("option");
        option.value = fac;
        option.textContent = fac;
        selectElement.appendChild(option);
      });
    }
  }

  // 📌 Bind change events to update dependent dropdowns
  searchSubMunicipal.addEventListener("change", () => {
    updateFacilityDropdown(searchFacility, searchSubMunicipal.value);
  });
  subMunicipalSelect.addEventListener("change", () => {
    updateFacilityDropdown(facilitySelect, subMunicipalSelect.value);
  });

  // ➕ Add row to action item table
  function createActionRow(data = {}) {
    const row = document.createElement("tr");
    const fields = [
      "clinical_area", "challenges", "proposed_changes", "indicator",
      "time_frame", "person_responsible", "resources", "next_assessment"
    ];

    fields.forEach(field => {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.name = field;
      input.type = field.includes("date") ? "date" : "text";
      input.value = data[field] || "";
      td.appendChild(input);
      row.appendChild(td);
    });

    const deleteTd = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.textContent = "🗑";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.border = "none";
    deleteBtn.addEventListener("click", () => row.remove());
    deleteTd.appendChild(deleteBtn);
    row.appendChild(deleteTd);

    actionTableBody.appendChild(row);
  }

  addRowBtn.addEventListener("click", () => createActionRow());

  // 🔍 Handle Search
  searchBtn.addEventListener("click", async () => {
    const sub_municipal = searchSubMunicipal.value;
    const facility_name = searchFacility.value;
    const quarter = searchQuarter.value;
    const monitoring_year = searchYear.value;

    if (!sub_municipal || !facility_name || !quarter || !monitoring_year) {
      alert("Please fill all search fields.");
      return;
    }

    try {
      const query = new URLSearchParams({
        sub_municipal,
        facility_name,
        quarter,
        monitoring_year,
      });

      const res = await fetch(`${BASE_API_URL}/api/edit-action-plan/search?${query.toString()}`);
      if (!res.ok) throw new Error("Not found");

      const result = await res.json();
      const plan = result.plan;

      hiddenIdInput.value = plan.id;
      subMunicipalSelect.value = plan.sub_municipal;
      subMunicipalSelect.dispatchEvent(new Event("change"));
      facilitySelect.value = plan.facility_name;
      quarterSelect.value = plan.quarter;
      yearInput.value = plan.monitoring_year;
      dateInput.value = plan.date?.split("T")[0];
      supervisorInput.value = plan.supervisor_name;
      inchargeInput.value = plan.in_charge_name;

      actionTableBody.innerHTML = "";
      plan.actions.forEach(row => createActionRow(row));

      editSection.style.display = "block";

    } catch (err) {
      console.error("❌ Error loading plan", err);
      alert("Action Plan not found.");
    }
  });

  // 💾 Handle Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = hiddenIdInput.value;
    if (!id) return alert("No Action Plan loaded.");

    const payload = {
      sub_municipal: subMunicipalSelect.value,
      facility_name: facilitySelect.value,
      quarter: quarterSelect.value,
      monitoring_year: parseInt(yearInput.value),
      date: dateInput.value,
      supervisor_name: supervisorInput.value,
      in_charge_name: inchargeInput.value,
      actions: []
    };

    const rows = actionTableBody.querySelectorAll("tr");
    for (let row of rows) {
      const inputs = row.querySelectorAll("input");
      if (inputs.length === 8) {
        const [
          clinical_area, challenges, proposed_changes, indicator,
          time_frame, person_responsible, resources, next_assessment
        ] = [...inputs].map(input => input.value.trim());

        if (clinical_area || challenges || proposed_changes) {
          payload.actions.push({
            clinical_area,
            challenges,
            proposed_changes,
            indicator,
            time_frame,
            person_responsible,
            resources,
            next_assessment
          });
        }
      }
    }

    try {
      const res = await fetch(`${BASE_API_URL}/api/edit-action-plan/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Update failed");

      alert("✅ Action Plan updated.");
      window.location.reload();

    } catch (err) {
      console.error("❌ Update failed:", err);
      alert("Failed to update Action Plan.");
    }
  });

  // ✅ ✅ ✅ AUTO-LOAD LOGIC HERE
  const autoPlanId = new URLSearchParams(window.location.search).get("id");
  if (autoPlanId) {
    (async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/api/action-plan/${autoPlanId}`);
        if (!res.ok) throw new Error("Plan not found");

        const result = await res.json();
        const plan = result.plan;

        hiddenIdInput.value = plan.id;
        subMunicipalSelect.value = plan.sub_municipal;
        subMunicipalSelect.dispatchEvent(new Event("change"));
        facilitySelect.value = plan.facility_name;
        quarterSelect.value = plan.quarter;
        yearInput.value = plan.monitoring_year;
        dateInput.value = plan.date?.split("T")[0];
        supervisorInput.value = plan.supervisor_name;
        inchargeInput.value = plan.in_charge_name;

        actionTableBody.innerHTML = "";
        plan.actions.forEach(row => createActionRow(row));

        editSection.style.display = "block";
      } catch (err) {
        console.error("❌ Auto-load failed:", err);
        alert("Failed to load Action Plan for editing.");
      }
    })();
  }

}); // End of DOMContentLoaded

// =============================
//This code handles the edit button inside the view all actions Page
// =============================
const saveBtn = document.getElementById("saveBtn");
if (saveBtn) {
  saveBtn.addEventListener("click", async () => {
    const planId = new URLSearchParams(window.location.search).get("id");
    if (!planId) return alert("❌ No Action Plan ID found in URL.");

    const payload = {
      sub_municipal: document.getElementById("sub_municipal").value,
      facility_name: document.getElementById("facility_name").value,
      quarter: document.getElementById("quarter").value,
      monitoring_year: document.getElementById("monitoring_year").value,
      date: document.getElementById("date").value,
      supervisor_name: document.getElementById("supervisor_name").value,
      in_charge_name: document.getElementById("in_charge_name").value,
      actions: []
    };

    const rows = document.querySelectorAll("#action_items_table tbody tr");
    for (let row of rows) {
      const inputs = row.querySelectorAll("input");
      if (inputs.length === 8) {
        const [clinical_area, challenges, proposed_changes, indicator,
          time_frame, person_responsible, resources, next_assessment] = [...inputs].map(input => input.value.trim());

        if (clinical_area || challenges || proposed_changes) {
          payload.actions.push({
            clinical_area,
            challenges,
            proposed_changes,
            indicator,
            time_frame,
            person_responsible,
            resources,
            next_assessment
          });
        }
      }
    }

    try {
      const res = await fetch(`${BASE_API_URL}/api/action-plan/${planId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ Action Plan updated successfully!");
        window.location.href = "viewAllActionPlans.html";
      } else {
        alert("❌ Failed to update Action Plan.");
      }
    } catch (err) {
      console.error("❌ Update error:", err);
      alert("❌ Network error during update.");
    }
  });
}


  // 🔙 Handle Back Button
  const backBtn = document.getElementById("backBtn");
  backBtn.addEventListener("click", () => {
    window.history.length > 1 ? window.history.back() : window.location.href = "viewAllActionPlans.html";
  });
