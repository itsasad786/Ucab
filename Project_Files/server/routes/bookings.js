const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// GET /api/bookings - rider gets their bookings; admin gets all
router.get('/', auth, async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'rider') query.riderId = req.user._id;
        else if (req.user.role === 'driver') query.driverId = req.user._id;
        // admin gets all
        const bookings = await Booking.find(query).sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/bookings - rider creates booking
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'rider') return res.status(403).json({ success: false, message: 'Only riders can book' });
        const booking = await Booking.create({ ...req.body, riderId: req.user._id, riderName: req.user.name });
        res.status(201).json({ success: true, booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PATCH /api/bookings/:id/status - driver or admin update status
router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        booking.status = status;
        await booking.save();
        res.json({ success: true, booking });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
