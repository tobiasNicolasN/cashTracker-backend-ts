import { Request, Response } from "express";
import Expense from "../models/expense.model";
import { calculateUSD } from "../services/dolar.service";
import { getExchange } from "../services/user.service";

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { category, amount, paymentMethod, detail, exchangeRate, date } =
      req.body;
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

    // Convierte al formato correcto de la fecha
    let creationDate: Date | undefined = undefined;
    if (date) {
      creationDate = new Date(date);
    }

    const amountUSD = await calculateUSD(amount, exchange, creationDate);

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
      userId: uid,
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
  try {
    const uid = req.body.userId;

    const expenses = await Expense.find({
      userId: uid,
    });

    if (expenses.length === 0) {
      console.error(
        "[expenses.getExpenses] El usuario no tiene gastos registrados."
      );
      return res
        .status(404)
        .json({ error: "El usuario no tiene gastos registrados" });
    }

    console.log(
      "[expenses.getExpenses] Gastos obtenidos correctamente, total:",
      expenses.length
    );
    res.status(200).json(expenses);
  } catch (error) {
    console.log(
      "[expenses.getExpenses] Se ha producido un error al obtener los gastos:",
      error
    );
    res.status(400).json({ error: error });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const expenseId = req.params.id;
    const uid = req.body.userId;

    const expense = await Expense.find({ _id: expenseId, userId: uid });

    if (!expense[0]) {
      console.error("[expenses.getExpense] No se ha encontrado el gasto.");
      return res.status(404).json({ error: "No se ha encontrado el gasto." });
    }

    console.log(
      "[expenses.getExpense] Se ha obtenido el gasto correctamente:",
      expense[0].id
    );
    res.status(200).json(expense[0]);
  } catch (error) {
    console.error(
      "[expenses.getExpense] Se ha producido un error al obtener el gasto:",
      error
    );
    res.status(400).json({ error: error });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const expenseId = req.params.id;
    const uid = req.body.userId;

    const expense = await Expense.findOneAndDelete({
      _id: expenseId,
      userId: uid,
    });

    if (!expense) {
      console.error("[expenses.deleteExpense] No se ha encontrado el gasto.");
      return res.status(404).json({ error: "No se ha encontrado el gasto." });
    }

    console.log(
      "[expenses.deleteExpense] Se elimino el gasto correctamente, id:",
      expenseId
    );
    res.sendStatus(204);
  } catch (error) {
    console.error(
      "[expenses.deleteExpense] Se ha producido un error al borrar el gasto:",
      error
    );
    res.status(400).json({ error: error });
  }
};
