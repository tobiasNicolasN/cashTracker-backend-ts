import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.middleware";
import { createExpense } from "../controllers/expense.controllers";

const router = Router();

router.post("/expenses", validateToken, createExpense);
router.get("/expenses", validateToken);
router.get("/expenses/:id", validateToken);
router.delete("/expenses/:id", validateToken);
router.put("/expenses/:id", validateToken);

export default router;
