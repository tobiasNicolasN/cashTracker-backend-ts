import mongoose from "mongoose";

interface IPayment extends Document {
  paymentMethod: String;
  balance: Number;
}

const paymentSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    balance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment