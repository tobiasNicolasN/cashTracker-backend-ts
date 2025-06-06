import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/auth.controller";
import { validatorSchema } from "../middlewares/validatorSchema.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validateToken } from "../middlewares/validateToken.middleware";

const router = Router();

router.post("/register", validatorSchema(registerSchema), register);
router.post("/login", validatorSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", validateToken, profile);

export default router;
