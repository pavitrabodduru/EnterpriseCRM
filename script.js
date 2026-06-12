let leads = JSON.parse(localStorage.getItem("leads")) || [];

function addLead() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const status = document.getElementById("status").value;

    if (name === "" || email === "" || phone === "") {
        alert("Please fill all fields!");
        return;
    }

    const lead = {
        name,
        email,
        phone,
        status
    };

    leads.push(lead);

    localStorage.setItem(
        "leads",
        JSON.stringify(leads)
    );

    displayLeads();
    updateStats();

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("status").value = "New";
}

function displayLeads() {
    const table = document.getElementById("leadTable");

    table.innerHTML = "";

    leads.forEach((lead, index) => {
        table.innerHTML += `
            <tr>
                <td>${lead.name}</td>
                <td>${lead.email}</td>
                <td>${lead.phone}</td>
                <td>${lead.status}</td>
                <td>
                    <button onclick="deleteLead(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function deleteLead(index) {
    leads.splice(index, 1);

    localStorage.setItem(
        "leads",
        JSON.stringify(leads)
    );

    displayLeads();
    updateStats();
}

function updateStats() {
    document.getElementById("totalLeads").innerText =
        leads.length;

    document.getElementById("contactedLeads").innerText =
        leads.filter(
            lead => lead.status === "Contacted"
        ).length;

    document.getElementById("closedDeals").innerText =
        leads.filter(
            lead => lead.status === "Closed"
        ).length;
}

function searchLead() {
    const searchValue =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll("#leadTable tr");

    rows.forEach(row => {
        const name =
            row.cells[0].innerText.toLowerCase();

        row.style.display =
            name.includes(searchValue)
                ? ""
                : "none";
    });
}

displayLeads();
updateStats();