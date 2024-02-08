import { Request, Response } from "express";
import Expense from "../models/expense.model";

export const createExpense = async (req: Request, res: Response) => {
  const { category, amount, paymentMethod, detail } = req.body;

  const newExpense = new Expense({
    user: req.body.userId,
    category,
    amount,
    paymentMethod,
    detail,
  });
  const savedExpense = await newExpense.save();

  res.json(savedExpense);
};

export const getExpenses = async (req: Request, res: Response) => {
  const expenses = await Expense.find({
    user: req.body.userId,
  });
  res.json({ expenses });
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ expense });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Cast to ObjectId failed')) {
      return res.status(400).json({ message: 'Invalid expense ID' });
    }

    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
