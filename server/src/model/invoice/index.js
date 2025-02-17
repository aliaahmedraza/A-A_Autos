import mongoose from "mongoose";
const invoiceSchema = new mongoose.Schema(
  {
    serviceBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceBooking",
      required: true,
    },
    items: [
      {
        description: String,
        amount: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    paymentMethod: { type: String, enum: ["online", "cash"] },
    transactionId: String,
  },
  { timestamps: true }
);

const invoiceModel = mongoose.model("Invoice", invoiceSchema);
export default invoiceModel;