import mongoose from "mongoose";
const serviceBookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    servicePackage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServicePackage",
    },
    additionalServices: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AdditionalService" },
    ],
    sparePartsUsed: [
      {
        sparePart: { type: mongoose.Schema.Types.ObjectId, ref: "SparePart" },
        quantity: Number,
      },
    ],
    pickupType: { type: String, enum: ["self", "delivery"], required: true },
    deliveryAddress: String,
    deliveryDistance: Number,
    deliveryCharges: Number,
    totalCost: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    serviceSlot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceSlot",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bike: { type: mongoose.Schema.Types.ObjectId, ref: "Bike", required: true },
  },
  { timestamps: true }
);
const serviceBookingModel = mongoose.model("ServiceBooking", serviceBookingSchema);
export default serviceBookingModel;