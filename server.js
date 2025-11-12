import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import billsRoutes from './routes/bills.js';
import myBillsRoutes from './routes/myBills.js';

dotenv.config();
const app = express();

// ✅ CORS: allow frontend to call backend
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-vercel-url.vercel.app'], 
  credentials: true,
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bills', billsRoutes);
app.use('/api/myBills', myBillsRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
