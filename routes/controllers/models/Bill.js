import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Electricity', 'Gas', 'Water', 'Internet'], required: true },
  email: { type: String, required: true }, // Who added the bill
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Bill image URL
  date: { type: Date, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model('Bill', billSchema);
