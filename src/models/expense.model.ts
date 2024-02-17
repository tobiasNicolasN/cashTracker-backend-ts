import mongoose from "mongoose";

interface IExpense extends Document {
  user: mongoose.Schema.Types.ObjectId;
  category: string;
  amount: number;
  amountUSD: number;
  paymentMethod: string;
  detail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    amountUSD: {
      type: Number
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
