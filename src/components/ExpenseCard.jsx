<div className="flex items-center gap-3">

  <span className="font-semibold">
    ₹{expense.amount}
  </span>

  <button
    onClick={() => deleteExpense(expense.id)}
    className="text-red-400"
  >
    Delete
  </button>

</div>