import express from 'express';
import { payBill, getMyBills, updateMyBill, deleteMyBill } from './controllers/myBillsController.js';

const router = express.Router();
router.post('/', payBill);
router.get('/:email', getMyBills);
router.put('/:id', updateMyBill);
router.delete('/:id', deleteMyBill);

export default router;
