import mongoose from "mongoose";

export interface IExpense extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  category: string;
  amount: number;
  amountUSD: number;
  paymentMethod: string;
  detail?: string;
  exchange: string;
  expensePaidAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  exchange?: string;
  createdAt: Date;
  updatedAt: Date;
}
