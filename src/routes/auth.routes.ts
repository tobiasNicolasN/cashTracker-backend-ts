import { Router } from "express";
import { register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login");
router.post("/logout");
router.get("/profile");

export default router;
