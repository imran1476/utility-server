import MyBill from './models/MyBill.js';

// Pay bill
export const payBill = async (req, res) => {
  try {
    const myBill = await MyBill.create(req.body);
    res.json({ message: "Bill paid", myBill });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get bills for logged-in user
export const getMyBills = async (req, res) => {
  try {
    const { email } = req.params; // frontend will send user email
    const bills = await MyBill.find({ email });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update myBill
export const updateMyBill = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MyBill.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Bill updated", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete myBill
export const deleteMyBill = async (req, res) => {
  try {
    const { id } = req.params;
    await MyBill.findByIdAndDelete(id);
    res.json({ message: "Bill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
