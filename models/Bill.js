import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const Bill = mongoose.model("Bill", billSchema);
export default Bill;
