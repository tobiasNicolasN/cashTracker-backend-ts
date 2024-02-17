import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.middleware";
import { createExpense, getExpenses, getExpense, deleteExpense } from "../controllers/expense.controllers";

const router = Router();

router.post("/expenses", validateToken, createExpense);
router.get("/expenses", validateToken, getExpenses);
router.get("/expenses/:id", validateToken, getExpense);
router.delete("/expenses/:id", validateToken, deleteExpense);
router.put("/expenses/:id", validateToken);

export default router;
