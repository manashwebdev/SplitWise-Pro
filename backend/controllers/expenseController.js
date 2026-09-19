import Expense from "../models/Expense.js";

export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpensesByTrip = async (req, res) => {
  try {
    const expenses = await Expense.find({
      tripId: req.params.tripId,
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};