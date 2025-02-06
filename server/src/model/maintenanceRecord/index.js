import mongoose from "mongoose";
const maintenanceRecordSchema = new mongoose.Schema(
  {
    bike: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bike",
      required: true,
    },
    serviceBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceBooking",
      required: true,
    },
    serviceDate: {
      type: Date,
      required: true,
    },
    nextServiceDue: Date,
    mileageAtService: {
      type: Number,
      required: true,
    },
    notes: String,
    mechanicNotes: String,
    replacedParts: [
      {
        sparePart: { type: mongoose.Schema.Types.ObjectId, ref: "SparePart" },
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

const maintenanceRecordModel = mongoose.model(
  "MaintenanceRecord",
  maintenanceRecordSchema
);
export default maintenanceRecordModel;