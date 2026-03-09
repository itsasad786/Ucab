const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    riderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    riderName: { type: String, required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driverName: { type: String, default: '' },
    cabId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cab' },
    cabModel: { type: String, default: '' },
    pickup: { type: String, required: true },
    drop: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    price: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
