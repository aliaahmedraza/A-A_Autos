import mongoose from "mongoose";
const bikeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    VIN: {
      type: String,
      required: true,
      unique: true,
    },
    registrationNumber: {
      type: String,
      unique: true,
    },
    manufactureYear: Number,
    color: String,
    currentMeterReading: {
      type: Number,
      required: true,
      min: 0,
    },
    purchaseDate: Date,
    lastServiceDate: Date,
  },
  { timestamps: true }
);
const bikeModel = mongoose.model("Bike", bikeSchema);
export default bikeModel;