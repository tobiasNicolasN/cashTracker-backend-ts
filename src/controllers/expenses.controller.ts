import { Request, Response } from "express";
import Expense from "../models/expense.model";
import { calculateUSD } from "../services/dolar.service";
import { getExchange } from "../services/user.service";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { category, amount, paymentMethod, detail, exchangeRate } = req.body;
    const uid: string = req.body.userId;

    // define el tipo de cambio
    const exchange: string | undefined =
      exchangeRate || (await getExchange(uid));

    if (!exchange) {
      console.error(
        "[expenses.createExpense] No se encontro moneda de cambio."
      );
      return res
        .status(400)
        .json({ error: "No se encontro ninguna moneda de cambio." });
    }

    const amountUSD = await calculateUSD(amount, exchange);

    // Verifica que se haya realizado la conversion correctamente
    if (!amountUSD) {
      console.error(
        "[expenses.createExpense] Se ha producido un error al subir el gasto."
      );
      return res
        .status(400)
        .json({ error: "Se ha producido un error al subir el gasto." });
    }

    const newExpense = new Expense({
      user: uid,
      category: category.toLowerCase(),
      amount,
      amountUSD,
      paymentMethod: paymentMethod.toLowerCase(),
      detail: detail?.toLowerCase() || "",
    });

    const savedExpense = await newExpense.save();

    console.log(
      "[expenses.createExpense] Se ha creado el gasto correctamente:",
      savedExpense.id
    );
    res.status(200).json(savedExpense);
  } catch (error) {
    console.error(
      "[expenses.createExpense] Se ha producido un error al subir el gasto:",
      error
    );
    return res.status(400).json({ error: error });
  }
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
