import mongoose from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  exchange?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
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
