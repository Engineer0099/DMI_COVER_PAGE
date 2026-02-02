const moduleData = {
    CSA: { code: "MTU 07107", lecturer: "Mr. O. Bakari" },
    // DB: { code: "CS305", lecturer: "Mr. M. David" },
    // OS: { code: "CS310", lecturer: "Dr. S. Peter" }
};

document.getElementById("moduleName").addEventListener("change", e => {
    const m = moduleData[e.target.value];
    document.getElementById("moduleCode").value = m ? m.code : "";
    document.getElementById("lecturerName").value = m ? m.lecturer : "";
});

/* ===== VALIDATION ===== */
function getFormData() {
    const form = document.getElementById("coverForm");
    if (!form.checkValidity()) {
        alert("Please fill all required fields");
        return null;
    }

    const data = {};
    [...form.elements].forEach(el => {
        if (el.id && el.value)
            data[el.id] = el.value.trim().toUpperCase();
    });

    if (data.natureOfWork === "GROUP") {
        data.groupNo = document.getElementById("groupNo").value.trim().toUpperCase();
        data.members = [...membersTable.children].map(row => ({
            name: row.querySelector(".member-name").value.trim().toUpperCase(),
            reg: row.querySelector(".member-reg").value.trim().toUpperCase()
        }));
    }

    return data;
}

/* ===== PREVIEW ===== */
document.getElementById("previewBtn").onclick = () => {
    const data = getFormData();
    if (!data) return;

    let html = "";
    for (let key in data) {
        html += `<p><b>${key.replace(/([A-Z])/g," $1")}:</b> ${data[key]}</p>`;
    }
    document.getElementById("previewContent").innerHTML = html;
    document.getElementById("previewModal").style.display = "flex";
};

function closePreview() {
    document.getElementById("previewModal").style.display = "none";
}

/* ===== CONNECT TO PDF GENERATOR ===== */
document.getElementById("coverForm").onsubmit = e => {
    e.preventDefault();
    const data = getFormData();
    if (!data) return;

    // CALL YOUR EXISTING PDF FUNCTION
    //generatePDF(data);
};

const natureSelect = document.getElementById("natureOfWork");
const groupSection = document.getElementById("groupSection");
const membersTable = document.querySelector("#membersTable tbody");

natureSelect.addEventListener("change", () => {
    if (natureSelect.value === "GROUP") {
        groupSection.classList.remove("hidden");
        if (membersTable.children.length === 0) addMember();
    } else {
        groupSection.classList.add("hidden");
        membersTable.innerHTML = "";
    }
});

/* ADD MEMBER */
function addMember() {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td></td>
        <td><input class="member-name"></td>
        <td><input class="member-reg"></td>
        <td>
            <button type="button" onclick="this.closest('tr').remove(); updateSN();">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;
    membersTable.appendChild(row);
    updateSN();
}

/* UPDATE SERIAL NUMBERS */
function updateSN() {
    [...membersTable.children].forEach((row, i) => {
        row.children[0].innerText = i + 1;
    });
}
document.getElementById("coverForm").onsubmit = e => {
    e.preventDefault();
    const data = getFormData();
    if (!data) return;

    if (data.natureOfWork === "GROUP") {
        generateGroupPDF(data);
    } else {
        generatePDF(data);
    }
};
