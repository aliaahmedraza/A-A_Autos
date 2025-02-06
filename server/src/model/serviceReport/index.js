import mongoose from "mongoose";
const serviceReportSchema = new mongoose.Schema(
  {
    serviceBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceBooking",
      required: true,
    },
    reportDetails: String,
    mediaUrls: [String],
  },
  { timestamps: true }
);

const serviceReportModel = mongoose.model("ServiceReport", serviceReportSchema);
export default serviceReportModel;