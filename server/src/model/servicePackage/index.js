import mongoose from "mongoose";
const servicePackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const servicePackageModel = mongoose.model("ServicePackage", servicePackageSchema);
export default servicePackageModel;