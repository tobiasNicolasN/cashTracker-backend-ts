import express from "express";
import authRoutes from "./routes/auth.routes";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import expensesRoutes from './routes/expense.routes'
import cors from 'cors'

const app = express();

app.use(cors())
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", expensesRoutes);


export default app;
