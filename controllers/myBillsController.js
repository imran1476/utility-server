// controllers/myBillsController.js
import MyBill from '../models/MyBill.js';

// Pay a bill
export const payBill = async (req, res) => {
  try {
    const { username, email, amount, address, phone, category } = req.body;

    // Validate required fields
    if (!username || !email || !amount || !address || !phone) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const myBill = await MyBill.create({ username, email, amount, address, phone, category });
    res.status(201).json({ message: "Bill paid", myBill });
  } catch (err) {
    console.error("Pay Bill Error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// Get bills for a specific user by email
export const getMyBills = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const bills = await MyBill.find({ email });
    res.json(bills);
  } catch (err) {
    console.error("Get My Bills Error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// Update a bill
export const updateMyBill = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Bill ID is required" });

    const updated = await MyBill.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Bill not found" });

    res.json({ message: "Bill updated", updated });
  } catch (err) {
    console.error("Update My Bill Error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// Delete a bill
export const deleteMyBill = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Bill ID is required" });

    const deleted = await MyBill.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Bill not found" });

    res.json({ message: "Bill deleted" });
  } catch (err) {
    console.error("Delete My Bill Error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
