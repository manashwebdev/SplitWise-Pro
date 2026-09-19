import express from "express";
import {
  createExpense,
  getExpensesByTrip,
} from "../controllers/expenseController.js";

const router = express.Router();

router.post("/", createExpense);
router.get("/:tripId", getExpensesByTrip);

export default router;