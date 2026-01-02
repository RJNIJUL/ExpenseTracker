const form = document.getElementById("expenseForm");
const list = document.getElementById("expenseList");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
    list.innerHTML = "";
    let total = 0;

    expenses.forEach((exp, index) => {
        total += Number(exp.amount);

        const li = document.createElement("li");
        li.innerHTML = `
            ${exp.title} (${exp.category}) - ₹${exp.amount}
            <span class="delete" onclick="deleteExpense(${index})">✖</span>
        `;
        list.appendChild(li);
    });

    totalEl.innerText = total;
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    expenses.push({ title, amount, category });
    renderExpenses();

    form.reset();
});

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}

renderExpenses();
