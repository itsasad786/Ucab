const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
    model: { type: String, required: true, trim: true },
    type: { type: String, enum: ['Mini', 'Sedan', 'SUV'], default: 'Sedan' },
    plate: { type: String, required: true, unique: true, trim: true },
    seats: { type: Number, default: 4 },
    driver: { type: String, default: '' },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pricePerKm: { type: Number, default: 40 },
    rating: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Cab', cabSchema);
