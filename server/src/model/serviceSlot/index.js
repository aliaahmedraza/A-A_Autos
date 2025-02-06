import mongoose from "mongoose";
const serviceSlotSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    maxSlots: { type: Number, default: 5 },
    bookedSlots: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const serviceSlotModel = mongoose.model("ServiceSlot", serviceSlotSchema);
export default serviceSlotModel;