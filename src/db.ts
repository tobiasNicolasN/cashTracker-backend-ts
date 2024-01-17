import mongoose from "mongoose";

const mongoURL = "mongodb://localhost/misGastosDB-TS";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
