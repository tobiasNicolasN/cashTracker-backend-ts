import express from "express";
import authRoutes from './routes/auth.routes'
import morgan from 'morgan'

const app = express();

app.use(morgan("dev"))
app.use(express.json())
app.use("/api", authRoutes)

export default app;
