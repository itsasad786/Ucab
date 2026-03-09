const express = require('express');
const router = express.Router();
const Cab = require('../models/Cab');
const auth = require('../middleware/auth');

// GET /api/cabs - get all available cabs (public)
router.get('/', async (req, res) => {
    try {
        const cabs = await Cab.find({ available: true });
        res.json({ success: true, cabs });
    } catch (err) {
        console.error('Cabs GET error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
});

// GET /api/cabs/all - admin only
router.get('/all', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Access denied' });
        const cabs = await Cab.find();
        res.json({ success: true, cabs });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// POST /api/cabs - admin add cab
router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Access denied' });
        const cab = await Cab.create(req.body);
        res.status(201).json({ success: true, cab });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PUT /api/cabs/:id - admin update cab
router.put('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Access denied' });
        const cab = await Cab.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!cab) return res.status(404).json({ success: false, message: 'Cab not found' });
        res.json({ success: true, cab });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// DELETE /api/cabs/:id - admin delete cab
router.delete('/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ success: false, message: 'Access denied' });
        const cab = await Cab.findByIdAndDelete(req.params.id);
        if (!cab) return res.status(404).json({ success: false, message: 'Cab not found' });
        res.json({ success: true, message: 'Cab deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

module.exports = router;
