import mongoose from "mongoose";
import { DB_URI } from "./config";

const mongoURL = DB_URI!;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
