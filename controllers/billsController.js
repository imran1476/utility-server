// controllers/billsController.js
import Bill from '../models/Bill.js';

// Add new bill
export const addBill = async (req, res) => {
  try {
    const { username, email, amount, address, phone, category } = req.body;

    // Validate required fields
    if (!username || !email || !amount || !address || !phone) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const bill = await Bill.create({ username, email, amount, address, phone, category });
    res.status(201).json({ message: "Bill added", bill });
  } catch (err) {
    console.error("Add Bill Error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// Get all bills
export const getBills = async (req, res) => {
  try {
    const { category, limit } = req.query;
    let query = {};
    if (category) query.category = category;

    const bills = await Bill.find(query).limit(limit ? parseInt(limit) : 0);
    res.json(bills);
  } catch (err) {
    console.error("Get Bills Error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// Get bill by ID
export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (err) {
    console.error("Get Bill By ID Error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
