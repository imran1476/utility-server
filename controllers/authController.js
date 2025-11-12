import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route POST /api/auth/register
export const register = async (req, res) => {
    try {
        const { name, email, password, photoURL } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        // Password validation (min 6 chars, uppercase, lowercase)
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
            return res.status(400).json({ message: "Password must have uppercase, lowercase, and at least 6 chars" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, photoURL });

        const token = generateToken(user._id);
        res.status(201).json({ user, token });

    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).json({ message: "Server error: " + err.message });
    }
};

// @route POST /api/auth/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);
        res.json({ user, token });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Server error: " + err.message });
    }
};

// @route POST /api/auth/google-auth
export const googleAuth = async (req, res) => {
    const { name, email, photoURL } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            // Register new user with a random placeholder password
            const tempPassword = (Math.random() + 1).toString(36).substring(2);
            const hashedPassword = await bcrypt.hash(tempPassword, 10);
            
            user = await User.create({ name, email, password: hashedPassword, photoURL });
        }

        const token = generateToken(user._id);
        res.status(200).json({ user, token });

    } catch (error) {
        res.status(500).json({ message: "Social login failed." });
    }
};