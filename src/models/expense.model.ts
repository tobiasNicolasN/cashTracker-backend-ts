import mongoose from "mongoose";

interface IExpense extends Document {
  user: mongoose.Schema.Types.ObjectId;
  category: string;
  amount: number;
  paymentMethod: string;
  detail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
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

const Expense = mongoose.model<IExpense>("Expense", userSchema);

export default Expense;
