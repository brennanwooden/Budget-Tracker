// Define the Budget class
class Budget {
    constructor() {
      this.income = [];  // Empty array to store income amounts
      this.expenses = [];  // Empty array to store expense amounts
    }
  
    // Method to add income
    addIncome(description, amount) {
      this.income.push(amount);  // Add the income amount to the income array
    }
  
    // Method to add expense
    addExpense(description, amount) {
      this.expenses.push(amount);  // Add the expense amount to the expenses array
    }
  
    // Method to calculate the total budget (net income - expenses)
    calculateTotal() {
      const totalIncome = this.income.reduce((sum, amount) => sum + amount, 0);  // Calculate the total income
      const totalExpenses = this.expenses.reduce((sum, amount) => sum + amount, 0);  // Calculate the total expenses
      return { totalBudget: totalIncome - totalExpenses, totalIncome, totalExpenses };  // Return total values
    }
  }
  
  // Create a new instance of the Budget class
  const budget = new Budget();
  
  // Get references to the HTML elements for displaying totals and history
  const totalBudgetElem = document.getElementById('total-budget');
  const totalIncomeElem = document.getElementById('total-income');
  const totalExpensesElem = document.getElementById('total-expenses');
  const historyElem = document.getElementById('history');
  
  // Add event listeners for both 'add-income' and 'add-expense' buttons
  ['income', 'expense'].forEach(type => {
    document.getElementById(`add-${type}`).addEventListener('click', () => handleAdd(type));  // Attach the same event listener for both types
  });
  
  // Handle adding income or expense based on the type
  function handleAdd(type) {
    const description = document.getElementById('description').value;  // Get the description from the input field
    const amount = parseFloat(document.getElementById('amount').value);  // Get the amount, convert to float
  
    // Check if the description is empty or amount is invalid (NaN or <= 0)
    if (!description || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid description and amount.');  // Alert the user if input is invalid
      return;
    }
  
    // Add income or expense based on the type (income or expense)
    if (type === 'income') {
      budget.addIncome(description, amount);  // Add income to the budget
    } else {
      budget.addExpense(description, amount);  // Add expense to the budget
    }
  
    const updatedBudget = budget.calculateTotal();  // Get the updated total budget
    updateUI(updatedBudget);  // Update the UI with the new budget totals
    addHistoryItem(type, description, amount);  // Add the transaction to the history list
    clearInputs();  // Clear the input fields after adding the transaction
  }
  
  // Update the UI elements with the current totals
  function updateUI({ totalBudget, totalIncome, totalExpenses }) {
    totalBudgetElem.textContent = `$${totalBudget.toFixed(2)}`;  // Update the total budget display
    totalIncomeElem.textContent = `$${totalIncome.toFixed(2)}`;  // Update the total income display
    totalExpensesElem.textContent = `$${Math.abs(totalExpenses).toFixed(2)}`;  // Update the total expenses display (absolute value)
  }
  
  // Add a transaction history item to the list
  function addHistoryItem(type, description, amount) {
    const li = document.createElement('li');  // Create a new list item for the history
    li.textContent = `${type.toUpperCase()}: ${description} - $${amount.toFixed(2)}`;  // Set the text content of the list item
    li.style.color = type === 'income' ? '#2ecc71' : '#e74c3c';  // Set the color based on whether it's income (green) or expense (red)
    historyElem.appendChild(li);  // Append the list item to the history element
  }
  
  // Clear the input fields
  function clearInputs() {
    document.getElementById('description').value = '';  // Clear the description input field
    document.getElementById('amount').value = '';  // Clear the amount input field
  }
  