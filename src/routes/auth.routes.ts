import { Router } from "express";
import { login, logout, profile, register } from "../controllers/auth.controller";
import { validateToken } from "../middlewares/validateToken";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", validateToken);

export default router;
