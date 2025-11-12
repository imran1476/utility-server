// controllers/myBillsController.js
import MyBill from '../models/MyBill.js';

// Pay a bill
export const payBill = async (req, res) => {
  try {
    const myBill = await MyBill.create(req.body);
    res.json({ message: "Bill paid", myBill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bills for a specific user by email
export const getMyBills = async (req, res) => {
  try {
    const { email } = req.params; // frontend will send user email
    const bills = await MyBill.find({ email });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a bill
export const updateMyBill = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MyBill.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Bill not found" });
    res.json({ message: "Bill updated", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a bill
export const deleteMyBill = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MyBill.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Bill not found" });
    res.json({ message: "Bill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
