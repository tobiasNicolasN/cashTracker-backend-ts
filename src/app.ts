import express from "express";
import authRoutes from "./routes/auth.routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import expensesRoutes from "./routes/expense.routes";
import cors from "cors";
import { ORIGIN_URL } from "./config/dotenv";

const app = express();

const corsOptions = {
  origin: ORIGIN_URL! || "http://localhost:5173",
  credentials: true, // Permitir el envío de cookies
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", expensesRoutes);

export default app;
