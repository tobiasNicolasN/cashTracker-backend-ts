import mongoose from "mongoose";
import { DB_URI } from "./config";

const mongoURL = DB_URI!;

/**
 * Conecta la base de datos de mongo usando la variable de entorno
 * @param url url opcional. Default: {@link DB_URI}
 */
export const connectDB = async (url?: string) => {
  try {
    await mongoose.connect(url || mongoURL);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
