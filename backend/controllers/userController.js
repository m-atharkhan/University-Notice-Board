import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (req, res) => {
    const { fullName, registrationId, password, role } = req.body;

    if (!['student', 'professor'].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
    }

    const userExists = await User.findOne({ registrationId });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ fullName, registrationId, password, role });
    res.status(201).json({ message: "User registered successfully" });
};

export const loginUser = async (req, res) => {
    const { registrationId, password } = req.body;
    const user = await User.findOne({ registrationId });

    if (user && (await user.comparePassword(password))) {
        res.json({ token: generateToken(user._id), role: user.role, user: user });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};
