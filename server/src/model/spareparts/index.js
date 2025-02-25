import mongoose from "mongoose";
const sparePartSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    modle: String,
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true, default: 0 },
    manufacturer: { type: String, required: true },
    cc:{type:String},
    category: String,
  },
  { timestamps: true }
);

const sparePartModel = mongoose.model("SparePart", sparePartSchema);
export default sparePartModel;