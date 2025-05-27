import mongoose from "mongoose";
import { IExpense } from "../interfaces/data.interface";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountUSD: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
    detail: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;
