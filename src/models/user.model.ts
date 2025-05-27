import mongoose from "mongoose";
import { IUser } from "../interfaces/data.interface";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      sparse: true,
    },
    password: {
      type: String,
      required: true,
    },
    exchange: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
