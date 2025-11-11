import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import billsRoutes from './routes/bills.js';
import myBillsRoutes from './routes/myBills.js';

dotenv.config();
const app = express();

// CORS: allow frontend to call backend
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bills', billsRoutes);        // bills route
app.use('/api/myBills', myBillsRoutes);    // user-specific bills

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Listen
app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));
