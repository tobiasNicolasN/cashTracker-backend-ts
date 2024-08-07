import { Request, Response } from "express";
import Expense from "../models/expense.model";
import { calculateUSD } from "../api/dolarOficial.api";

export const createExpense = async (req: Request, res: Response) => {
  const { category, amount, paymentMethod, detail, exchangeRate } = req.body;
  const amountUSD = await calculateUSD(amount, exchangeRate);

  const newExpense = new Expense({
    user: req.body.userId,
    category,
    amount,
    amountUSD,
    paymentMethod,
    detail,
  });
  const savedExpense = await newExpense.save();
  res.status(200).json(savedExpense);
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
    if (
      error instanceof Error &&
      error.message.includes("Cast to ObjectId failed")
    ) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Cast to ObjectId failed")
    ) {
      return res.status(400).json({ message: "Invalid expense ID" });
    }

    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
