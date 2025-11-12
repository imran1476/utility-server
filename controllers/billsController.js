// controllers/billsController.js
import Bill from '../models/Bill.js';

// Add new bill
export const addBill = async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.json({ message: "Bill added", bill });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(500).json({ message: err.message });
  }
};

// Get bill by ID
export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
