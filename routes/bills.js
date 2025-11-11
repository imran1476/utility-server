import express from 'express';
import { addBill, getBills, getBillById } from './controllers/billsController.js';

const router = express.Router();
router.post('/', addBill);
router.get('/', getBills);
router.get('/:id', getBillById);

export default router;
