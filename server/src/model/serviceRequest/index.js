import mongoose from "mongoose"; 
const serviceRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    serviceBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceBooking",
      required: true,
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open",
    },
    resolutionDetails: String,
  },
  { timestamps: true }
);

const serviceRequestModel = mongoose.model("ServiceRequest", serviceRequestSchema);
export default serviceRequestModel;