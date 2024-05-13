// Get form, expense list, and total amount elements 
const expenseForm = document.getElementById("expense-form"); 
const expenseList = document.getElementById("expense-list"); 
const totalAmountElement = document.getElementById("total-amount");
const modal = document.getElementById("editModal");
const span = document.getElementsByClassName("close-btn")[0];

// Initialize expenses array from localStorage 
let expenses = JSON.parse(localStorage.getItem("expenses")) || []; 

// Function to render expenses in tabular form 
function renderExpenses() { 
    // Clear expense list 
    expenseList.innerHTML = ""; 

    // Initialize total amount 
    let totalAmount = 0; 

    // Loop through expenses array and create table rows 
    for (let i = 0; i < expenses.length; i++) { 
        const expense = expenses[i]; 
        const expenseRow = document.createElement("tr"); 
        expenseRow.innerHTML = ` 
        <td>${expense.name}</td> 
        <td>$${expense.amount.toFixed(2)}</td> 
        <td><button class="edit-btn" data-id="${i}">Edit</button></td>
        <td><button class="delete-btn" data-id="${i}">Delete</button></td> 
        `; 
        expenseList.appendChild(expenseRow); 

        // Update total amount 
        totalAmount += expense.amount; 
    } 

    // Update total amount display 
    totalAmountElement.textContent = totalAmount.toFixed(2); 

    // Save expenses to localStorage 
    localStorage.setItem("expenses", JSON.stringify(expenses)); 
} 

// Function to add expense 
function addExpense(event) { 
    event.preventDefault(); 

    // Get expense name and amount from form 
    const expenseNameInput = document.getElementById("expense-name"); 
    const expenseAmountInput = document.getElementById("expense-amount"); 
    const expenseName = expenseNameInput.value; 
    const expenseAmount = parseFloat(expenseAmountInput.value); 

    // Clear form inputs 
    expenseNameInput.value = ""; 
    expenseAmountInput.value = ""; 

    // Validate inputs 
    if (expenseName === "" || isNaN(expenseAmount)) { 
        alert("Please enter valid expense details."); 
        return; 
    } 

    // Create new expense object 
    const expense = { 
        name: expenseName, 
        amount: expenseAmount 
    }; 

    // Add expense to expenses array 
    expenses.push(expense); 

    // Render expenses 
    renderExpenses(); 
} 

// Function to edit expense 
function editExpense(event) { 
    if (event.target.classList.contains("edit-btn")) { 
        const expenseIndex = parseInt(event.target.getAttribute("data-id")); 
        showModal(expenseIndex);

        if (newName !== null && newAmount !== null && !isNaN(newAmount)) {
            expenses[expenseIndex] = { name: newName, amount: parseFloat(newAmount) };
            renderExpenses(); // Render the updated expenses
        }
    } 
} 

// Function to delete expense 
function deleteExpense(event) { 
    if (event.target.classList.contains("delete-btn")) { 
        const expenseIndex = parseInt(event.target.getAttribute("data-id")); 
        expenses.splice(expenseIndex, 1); 
        renderExpenses(); 
    } 
} 

// Modal start
// When the user clicks on the button, open the modal 
function showModal(editIndex) {
    document.getElementById("editIndex").value = editIndex;
    document.getElementById("editName").value = expenses[editIndex].name;
    document.getElementById("editAmount").value = expenses[editIndex].amount;
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Update expense on form submit
document.getElementById("editForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const editIndex = document.getElementById("editIndex").value;
    const newName = document.getElementById("editName").value;
    const newAmount = parseFloat(document.getElementById("editAmount").value);
    expenses[editIndex] = { name: newName, amount: newAmount };
    renderExpenses();
    modal.style.display = "none";
});



// Add event listeners 
expenseForm.addEventListener("submit", addExpense); 
expenseList.addEventListener("click", deleteExpense); 
expenseList.addEventListener("click", editExpense); 

// Render initial expenses on page load 
renderExpenses();
