import { Request, Response } from "express";
import Expense from "../models/expense.model";

export const createExpense = async (req: Request, res: Response) => {
  const { category, amount, paymentMethod, detail } = req.body;

  const newExpense = new Expense({
    user: req.body.userId,
    category,
    amount,
    paymentMethod,
    detail
  });
  const savedExpense = await newExpense.save();

  res.json(savedExpense);
};
