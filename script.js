document.addEventListener('DOMContentLoaded',()=>{
const expenseForm= document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmountDisplay = document.getElementById("total-amount");

let expenses=JSON.parse(localStorage.getItem("expenses"))||[];
let totalAmount=calculateTotalAmount();

expenseForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name=expenseNameInput.value.trim();
    const amount=parseFloat(expenseAmountInput.value.trim());
    if(name!==""  &&  amount>0 && !isNaN(amount)){
        const newExpenses={
            id:Date.now(),
            name:name,
            amount:amount
        }

        expenses.push(newExpenses);
        saveExpenseToLocal();
        renderExpenses();
        updateTotalAmount();

        //clear
        expenseNameInput.value="";
        expenseAmountInput.value="";
    }
})

function renderExpenses(){
    expenseList.innerHTML="";
    expenses.forEach(expense => {
        const li =document.createElement('li');
        li.innerHTML=`${expense.name} - $ ${expense.amount}
        <button data-id="${expense.id}">Remove</button>`;
        expenseList.appendChild(li);

    });
}

expenseList.addEventListener("click",(e)=>{
    if(e.target.tagName==="BUTTON"){
        const expenseId=parseInt(e.target.getAttribute('data-id'));
      expenses=expenses.filter((expense)=>expense.id!==expenseId);
      saveExpenseToLocal();
      updateTotalAmount();
      renderExpenses();
    }
})

function calculateTotalAmount(){
    return expenses.reduce((sum,expense)=>sum+expense.amount,0);
}

function saveExpenseToLocal(){
    localStorage.setItem("expenses",JSON.stringify(expenses));
}

function updateTotalAmount(){
    totalAmount = calculateTotalAmount();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
    console.log(totalAmount);
    // saveExpenseToLocal();
}
updateTotalAmount();

})