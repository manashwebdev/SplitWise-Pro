import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    tripId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paidBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Expense",
  expenseSchema
);