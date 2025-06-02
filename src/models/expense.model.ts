import mongoose from "mongoose";
import { IExpense } from "../interfaces/data.interface";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    amountUSD: {
      type: Number,
    },
    exchangeRateUSD: {
      type: Number,
    },
    exchange: {
      type: String,
    },
    detail: {
      type: String,
    },
    expensePaidAt: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;
