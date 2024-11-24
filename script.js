class BudgetTracker {
  constructor() {
    // incomes and expense are set to an empty array
    this.incomes = [];
    this.expenses = [];
  }
  
  // Add income method
  addIncome() {
    const description = document.getElementById('income-description').value;
    const amount = parseFloat(document.getElementById('income-amount').value);
     // Checks if description is not empty and amount is a valid positive number
    if (!description || amount <= 0) {
      alert('Enter a valid input');
      return; 
    }
    // Pushes income description and amount to the UI 
    this.incomes.push({ description, amount });
    this.updateUI();
  }

  // Add expense method
  addExpense() {
    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    // Checks if description is not empty and amount is a valid positive number
    if (!description || amount <= 0) {
      alert('Enter a valid input');
      return;
    }
    // Pushes expense description and amount to the UI
    this.expenses.push({ description, amount });
    this.updateUI();
  }

  // Deletes item at specific index within the income array then updates the UI
  deleteIncome(index) {
    if (confirm('Are you sure you want to delete this income?')) {
      this.incomes.splice(index, 1);
      this.updateUI();
    }
  }

  // Deletes item at specific index within the expense array then updates the UI
  deleteExpense(index) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenses.splice(index, 1);
      this.updateUI();
    }
  }

  // Method to calculate total of either income or expenses
  calculateTotal(type) {
    // Uses the reduce method to add up the amounts in the array (incomes or expenses)
    return type.reduce((total, item) => total + item.amount, 0);
  }

  // Update UI method with latest information
  updateUI() {
    const totalIncome = this.calculateTotal(this.incomes);
    const totalExpenses = this.calculateTotal(this.expenses);
    const balance = totalIncome - totalExpenses;

    // Gets elements by Id and uses toFixed to make sure it's only 2 decimal places
    document.getElementById('total-income').innerText = totalIncome.toFixed(2);
    document.getElementById('total-expenses').innerText = totalExpenses.toFixed(2);
    document.getElementById('balance').innerText = balance.toFixed(2);

    // Updates the incomelist in the UI
    const incomeList = document.getElementById('income-list');
    incomeList.innerHTML = ''; 
    this.incomes.forEach((income, index) => {
      // Creates new li for each income added
      const li = document.createElement('li');
      li.className = 'income';
      li.innerHTML = `
        <span>${income.description}: ${income.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="budgetTracker.deleteIncome(${index})"><i class="fas fa-trash"></i></button>
      `;
      // Adds new li to income list
      incomeList.appendChild(li); 
    });

    // Updates the expenselist in the UI
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = ''; 
    this.expenses.forEach((expense, index) => {
      // Creates new li for each expense added
      const li = document.createElement('li');
      li.className = 'expense';
      li.innerHTML = `
        <span>${expense.description}: ${expense.amount.toFixed(2)}</span>
        <button class="delete-btn" onclick="budgetTracker.deleteExpense(${index})"><i class="fas fa-trash"></i></button>
      `;
      // Adds new li to expenses list
      expenseList.appendChild(li); 
    });
  }
}

// Creates new instance and initalizes it
const budgetTracker = new BudgetTracker();
