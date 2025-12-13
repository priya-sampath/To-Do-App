let editValue = 0;
//let transactionsList = [];
//let transactionsList = JSON.parse(localStorage.getItem("incomeExpenseEntries"));

function saveData() {
  localStorage.setItem(
    "incomeExpenseEntries",
    JSON.stringify(transactionsList)
  );
}

function loadData() {
  const getStoredData = localStorage.getItem("incomeExpenseEntries");
  if (getStoredData) {
    transactionsList = JSON.parse(getStoredData);
  } else {
    transactionsList = [];
  }
}

function updateAllInTotal() {
  const totalIncome = transactionsList
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const totalExpense = transactionsList
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  const netBalance = totalIncome - totalExpense;

  document.getElementById("total-income").textContent = `₹${totalIncome.toFixed(
    2
  )}`;
  document.getElementById(
    "total-expense"
  ).textContent = `₹${totalExpense.toFixed(2)}`;
  document.getElementById("net-balance").textContent = `₹${netBalance.toFixed(
    2
  )}`;
}

function postData() {
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.querySelector('input[name="type"]:checked').value;
  if (editValue !== 0) {
    updateData(editValue, description, amount, type);
    editValue = 0;
    document.getElementById("submitBtn").textContent = "Add Data";
  } else {
    createData(description, amount, type);
  }
  resetAll();
  //alert("hello");
}

function createData(description, amount, type) {
  const datas = {
    id: Date.now(),
    description,
    amount,
    type,
    date: new Date(),
  };

  transactionsList.push(datas);
  saveData();
  showData();
  updateAllInTotal();
}

function editData(id) {
  const enteredData = transactionsList.find((e) => e.id === id);
  if (enteredData) {
    document.getElementById("description").value = enteredData.description;
    document.getElementById("amount").value = enteredData.amount;
    document.querySelector(
      `input[name="type"][value="${enteredData.type}"]`
    ).checked = true;
    editValue = id;
    document.getElementById("submitBtn").textContent = "Update data";
  }
}

function updateData(id, description, amount, type) {
  console.log(id);
  // transactionsList = list;
  for (let i = 0; i < transactionsList.length; i++) {
    if (transactionsList[i].id === id) {
      // Found the entry! Update its values
      transactionsList[i].description = description;
      transactionsList[i].amount = amount;
      transactionsList[i].type = type;

      // Save to localStorage directly here
      localStorage.setItem(
        "incomeExpenseEntries",
        JSON.stringify(transactionsList)
      );
      showData();
      updateAllInTotal();
      break;
    }
  }
}

function deleteData(id) {
  if (confirm("Are you sure you want to delete this entry?")) {
    transactionsList = transactionsList.filter((entry) => entry.id !== id);
    saveData();
    showData();
    updateAllInTotal();
  }
}

function showData() {
  let selectedFilter = document.querySelector(
    'input[name="filter"]:checked'
  ).value;

  let dataListContainer = document.getElementById("data-list");

  let filteredEntries = transactionsList;
  if (selectedFilter !== "all") {
    filteredEntries = filteredEntries.filter(function (entry) {
      return entry.type === selectedFilter;
    });
  }
  if (filteredEntries.length === 0) {
    dataListContainer.innerHTML = `
            <div class="text-center py-16 text-gray-400 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                <div class="text-6xl mb-4">⛔</div>
                <p class="text-lg">No transactions found!</p>
            </div>
        `;
    return;
  }

  let tableHTML = `
        <div class="overflow-x-auto">
            <table class="w-full bg-white rounded-xl overflow-hidden shadow-lg">
                <thead class="bg-linear-to-r from-purple-600 to-indigo-600 text-white">
                    <tr>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">S.No</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Description</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Amount</th>
                        <th class="px-6 py-4 text-left text-sm font-bold uppercase">Date</th>
                        <th class="px-6 py-4 text-center text-sm font-bold uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
    `;
  let tableRows = filteredEntries.map(function (entry, index) {
    let entryDate = new Date(entry.date);
    let day = entryDate.getDate();
    let month = entryDate.getMonth() + 1;
    let year = entryDate.getFullYear();
    let hours = entryDate.getHours();
    let minutes = entryDate.getMinutes();

    // Add zero before single digit minutes
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let formattedDate =
      day + "-" + month + "-" + year + " " + hours + ":" + minutes;

    let amountColor =
      entry.type === "income" ? "text-green-600" : "text-red-600";
    let typeColor =
      entry.type === "income"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";
    let sign = entry.type === "income" ? "+" : "-";

    return `
            <tr class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 text-gray-700 font-medium">${
                  index + 1
                }</td>
                <td class="px-6 py-4 text-gray-900 font-semibold">${
                  entry.description
                }</td>
                
                <td class="px-6 py-4 text-lg font-bold ${amountColor}">
                    ${sign}₹${entry.amount.toFixed(2)}
                </td>
                <td class="px-6 py-4 text-gray-600 text-sm">${formattedDate}</td>
                <td class="px-6 py-4">
                    <div class="flex gap-2 justify-center">
                        <button 
                            onclick="editData(${entry.id})"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-semibold cursor-pointer">
                            ✏️ 
                        </button>
                        <button 
                            onclick="deleteData(${entry.id})"
                            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm font-semibold cursor-pointer">
                            ❌ 
                        </button>
                    </div>
                </td>
            </tr>
        `;
  });
  tableHTML += tableRows.join("");
  tableHTML += `
                </tbody>
            </table>
        </div>
    `;
  dataListContainer.innerHTML = tableHTML;
}

function resetAll() {
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("type-income").checked = true;
  editValue = 0;
  document.getElementById("submitBtn").textContent = "Add Data";
}
loadData();
showData();
updateAllInTotal();
