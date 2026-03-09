const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const signToken = (user) =>
    jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// POST /api/auth/register (rider or driver)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        if (!['rider', 'driver'].includes(role)) {
            return res.status(400).json({ success: false, message: 'Invalid role for registration' });
        }
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });

        const user = await User.create({ name, email, password, role, phone: phone || '' });
        const token = signToken(user);
        const { password: _, ...userData } = user.toObject();
        res.status(201).json({ success: true, token, user: userData });
    } catch (err) {
        console.error('Auth register error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email, role });
        if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const match = await user.comparePassword(password);
        if (!match) return res.status(400).json({ success: false, message: 'Invalid credentials' });

        const token = signToken(user);
        const { password: _, ...userData } = user.toObject();
        res.json({ success: true, token, user: userData });
    } catch (err) {
        console.error('Auth login error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/auth/me (protected)
const auth = require('../middleware/auth');
router.get('/me', auth, (req, res) => {
    res.json({ success: true, user: req.user });
});

module.exports = router;
