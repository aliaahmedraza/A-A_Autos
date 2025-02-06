import mongoose from "mongoose";
const serviceUpdateSchema = new mongoose.Schema(
  {
    serviceBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceBooking",
      required: true,
    },
    description: String,
    mediaUrls: [String],
    requiresApproval: Boolean,
    userApproved: Boolean,
  },
  { timestamps: true }
);

const serviceUpdateModel = mongoose.model("ServiceUpdate", serviceUpdateSchema);
export default serviceUpdateModel;