import mongoose from 'mongoose';

const myBillSchema = new mongoose.Schema({
  billId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
  username: { type: String, required: true },
  email: { type: String, required: true }, // logged-in user email
  phone: { type: String, required: true },
  address: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  additionalInfo: { type: String } // optional
}, { timestamps: true });

export default mongoose.model('MyBill', myBillSchema);
