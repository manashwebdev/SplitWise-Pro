import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

import AddExpenseForm from "../components/AddExpenseForm";
import SettlementEngine from "../components/SettlementEngine";
import AddMemberForm from "../components/AddMemberForm";
import ExpensePieChart from "../components/ExpensePieChart";
import ActivityTimeline from "../components/ActivityTimeline";
import calculateSettlements from "../utils/calculateSettlements";


export default function TripDetails() {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem(
      `trip-${id}-expenses`
    );

    return savedExpenses
      ? JSON.parse(savedExpenses)
      : [];
  });

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(
          `https://splitwise-pro-v1.onrender.com/api/trips/${id}`
        );

        setTrip(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrip();
  }, [id]);

  useEffect(() => {
    if (trip) {
      setMembers(trip.members || []);
    }
  }, [trip]);

  useEffect(() => {
    localStorage.setItem(
      `trip-${id}-expenses`,
      JSON.stringify(expenses)
    );
  }, [expenses, id]);

  useEffect(() => {
    const updateMembers = async () => {
      if (!trip) return;

      try {
        await axios.put(
          `https://splitwise-pro-v1.onrender.com/api/trips/${trip._id}`,
          {
            ...trip,
            members,
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    updateMembers();
  }, [members]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);

    const activities =
      JSON.parse(
        localStorage.getItem("activities")
      ) || [];

    activities.unshift({
      id: Date.now(),
      title: expense.title,
      user: expense.paidBy,
      amount: expense.amount,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      "activities",
      JSON.stringify(activities)
    );
  };

  const editExpense = (expense) => {
    const newTitle = prompt(
      "Edit expense title",
      expense.title
    );

    const newAmount = prompt(
      "Edit expense amount",
      expense.amount
    );

    if (!newTitle || !newAmount) return;

    setExpenses((prev) =>
      prev.map((item) =>
        item.id === expense.id
          ? {
            ...item,
            title: newTitle,
            amount: Number(newAmount),
          }
          : item
      )
    );
  };

  const deleteExpense = (expenseId) => {
    setExpenses((prev) =>
      prev.filter(
        (expense) => expense.id !== expenseId
      )
    );
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const filteredExpenses = expenses.filter(
    (expense) => {
      const matchesSearch =
        (expense.title || "")
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        expense.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  const foodTotal = expenses
    .filter(
      (expense) =>
        expense.category === "Food"
    )
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const transportTotal = expenses
    .filter(
      (expense) =>
        expense.category === "Transport"
    )
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const hotelTotal = expenses
    .filter(
      (expense) =>
        expense.category === "Hotel"
    )
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const shoppingTotal = expenses
    .filter(
      (expense) =>
        expense.category === "Shopping"
    )
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount),
      0
    );

  const totalSpent = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );
  const remaining =
    Number(trip.budget) - totalSpent;

  const budget = Number(trip.budget);

  const budgetUsedPercentage =
    budget > 0
      ? (totalSpent / budget) * 100
      : 0;

  const highestExpense =
    expenses.length > 0
      ? Math.max(
        ...expenses.map((e) =>
          Number(e.amount)
        )
      )
      : 0;

  const averageExpense =
    expenses.length > 0
      ? (
        totalSpent /
        expenses.length
      ).toFixed(0)
      : 0;

  const totalTransactions =
    expenses.length;

  const categoryTotals = {
    Food: foodTotal,
    Transport: transportTotal,
    Hotel: hotelTotal,
    Shopping: shoppingTotal,
  };

  const topCategory =
    Object.keys(categoryTotals).reduce(
      (a, b) =>
        categoryTotals[a] >
          categoryTotals[b]
          ? a
          : b
    );
  const generatePDF = () => {
    const doc = new jsPDF();

    const settlements = calculateSettlements(
      expenses,
      members
    );

    doc.setFontSize(20);
    doc.text(`${trip.name} Report`, 20, 20);

    doc.setFontSize(12);

    doc.text(
      `Budget: ₹${trip.budget}`,
      20,
      40
    );

    doc.text(
      `Spent: ₹${totalSpent}`,
      20,
      50
    );

    doc.text(
      `Remaining: ₹${remaining}`,
      20,
      60
    );

    doc.text("Expenses:", 20, 80);

    let y = 90;

    expenses.forEach((expense) => {
      doc.text(
        `${expense.title} - ₹${expense.amount}`,
        20,
        y
      );

      y += 10;
    });

    y += 10;

    doc.setFontSize(16);

    doc.text(
      "Settlement Summary",
      20,
      y
    );

    y += 10;

    doc.setFontSize(12);

    if (settlements.length === 0) {
      doc.text(
        "Everyone is settled up",
        20,
        y
      );
    } else {
      settlements.forEach((settlement) => {
        doc.text(
          `${settlement.from} owes ${settlement.to} ₹${settlement.amount.toFixed(0)}`,
          20,
          y
        );

        y += 10;
      });
    }

    doc.save(
      `${trip.name}-report.pdf`
    );
  };
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">

      <h1 className="text-3xl md:text-5xl font-bold mb-2">
        {trip.name}
      </h1>

      <p className="text-gray-400 mb-10">
        {members.length} Members • Budget Tracking Enabled
      </p>

      {/* Budget Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <p className="text-gray-400">
            Budget
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{trip.budget}
          </h2>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <p className="text-gray-400">
            Spent
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{totalSpent}
          </h2>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <p className="text-gray-400">
            Remaining
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            ₹{remaining}
          </h2>
        </div>

      </div>

      {/* Budget Warning */}

      {budgetUsedPercentage >= 100 && (
        <div className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/30">
          <h3 className="text-red-400 font-bold">
            ⚠ Budget Exceeded
          </h3>

          <p className="text-gray-300 text-sm">
            You have spent more than the trip budget.
          </p>
        </div>
      )}

      {budgetUsedPercentage >= 80 &&
        budgetUsedPercentage < 100 && (
          <div className="mb-8 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30">
            <h3 className="text-yellow-400 font-bold">
              ⚠ Approaching Budget Limit
            </h3>

            <p className="text-gray-300 text-sm">
              You have used{" "}
              {budgetUsedPercentage.toFixed(0)}%
              {" "}of your budget.
            </p>
          </div>
        )}

      {/* Members */}
      <div className="mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Members
        </h2>

        <AddMemberForm
          onAddMember={(name) =>
            setMembers((prev) => [...prev, name])
          }
        />

        <div className="flex gap-4 flex-wrap mt-6">

          {members.length === 0 ? (
            <p className="text-gray-400">
              No members added yet
            </p>
          ) : (
            members.map((member) => (
              <div
                key={member}
                className="w-14 h-14 rounded-full bg-violet-500/20 flex items-center justify-center font-bold text-violet-300"
              >
                {member[0].toUpperCase()}
              </div>
            ))
          )}

        </div>

      </div>

      {/* Add Expense */}
      <AddExpenseForm
        onAddExpense={addExpense}
        members={members}
      />
      {/* Search */}
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        className="w-full p-3 rounded-xl bg-black border border-white/10 mb-6"
      />

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }
        className="w-full p-3 rounded-xl bg-black border border-white/10 mb-6"
      >
        <option>All</option>
        <option>Food</option>
        <option>Transport</option>
        <option>Hotel</option>
        <option>Shopping</option>
        <option>Entertainment</option>
      </select>

      {/* Expenses */}
      <div className="mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Expenses
        </h2>

        <div className="space-y-4">

          {filteredExpenses.length === 0 ? (

            <div className="p-8 rounded-3xl border border-dashed border-white/10 text-center text-gray-400">
              No matching expenses found.
            </div>

          ) : (

            filteredExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5">
                <div>
                  <p className="font-medium">
                    {expense.title}
                  </p>

                  <p className="text-sm text-gray-400">
                    Paid by {expense.paidBy}
                  </p>
                  {expense.receiptImage && (
                    <img
                      src={expense.receiptImage}
                      alt="Receipt"
                      className="mt-2 w-24 h-24 object-cover rounded-xl border border-white/10"
                    />
                  )}
                  {expense.category && (
                    <p className="text-xs text-violet-400">
                      {expense.category}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">

                  <span className="font-semibold">
                    ₹{expense.amount}
                  </span>

                  <button
                    onClick={() =>
                      editExpense(expense)
                    }
                    className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteExpense(expense.id)
                    }
                    className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))

          )}

        </div>

      </div>

      {/* Expense Analytics */}

      <div className="mb-10">

        <h2 className="text-2xl font-bold mb-4">
          Expense Analytics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400">
              Transactions
            </p>
            <h3 className="text-2xl font-bold">
              {totalTransactions}
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400">
              Average Expense
            </p>
            <h3 className="text-2xl font-bold">
              ₹{averageExpense}
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400">
              Highest Expense
            </p>
            <h3 className="text-xl font-bold">
              ₹{highestExpense}
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400">
              Total Spent
            </p>
            <h3 className="text-2xl font-bold">
              ₹{totalSpent}
            </h3>
          </div>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">



          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400">
              Food
            </p>

            <h3 className="text-2xl font-bold text-green-400">
              ₹{foodTotal}
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400">
              Transport
            </p>

            <h3 className="text-2xl font-bold text-blue-400">
              ₹{transportTotal}
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400">
              Hotel
            </p>

            <h3 className="text-2xl font-bold text-yellow-400">
              ₹{hotelTotal}
            </h3>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-gray-400">
              Shopping
            </p>

            <h3 className="text-2xl font-bold text-pink-400">
              ₹{shoppingTotal}
            </h3>
          </div>

        </div>

      </div>


      {/* Expense Pie Chart */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Expense Breakdown
        </h2>

        <ExpensePieChart
          food={foodTotal}
          transport={transportTotal}
          hotel={hotelTotal}
          shopping={shoppingTotal}
        />
      </div>

      <div className="mb-8">
        <button
          onClick={generatePDF}
          className="w-full md:w-auto px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 transition"
        >
          Export PDF Report
        </button>
      </div>

      {/* Activity Timeline */}

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          Activity Timeline
        </h2>

        <ActivityTimeline />
      </div>

      {/* Settlement */}
      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Settlement Summary
        </h2>

        <SettlementEngine
          expenses={expenses}
          members={members}
        />

      </div>
      {/* Settlement */}
      <div className="mt-10">

      </div>

    </div>
  );
}