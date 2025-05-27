import app from "./app";
import { PORT } from "./config/dotenv";
import { connectDB } from "./config/db";

connectDB();
app.listen(PORT);
console.log("Server listen on port: ", PORT);
