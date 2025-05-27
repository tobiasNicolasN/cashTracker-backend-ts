import mongoose from "mongoose";

export interface IExpense extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  category: string;
  amount: number;
  amountUSD: number;
  paymentMethod: string;
  detail?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  exchange?: string;
  createdAt: Date;
  updatedAt: Date;
}