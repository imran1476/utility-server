import mongoose from "mongoose";

const myBillSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

const MyBill = mongoose.model("MyBill", myBillSchema);
export default MyBill;
