import Bill from './models/Bill.js';

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
    const { category } = req.query;
    let query = {};
    if (category) query.category = category;

    const bills = await Bill.find(query).limit(6);
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bill by ID
export const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
