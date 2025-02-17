import mongoose from "mongoose";
const additionalServiceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const additionalServiceModel = mongoose.model(
  "AdditionalService",
  additionalServiceSchema
);
export default additionalServiceModel;