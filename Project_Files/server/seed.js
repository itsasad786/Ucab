require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Cab = require('./models/Cab');
const Booking = require('./models/Booking');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Cab.deleteMany({});
        await Booking.deleteMany({});

        // Create users
        const rider = await User.create({ name: 'Arjun Sharma', email: 'rider@ucab.com', password: 'rider123', role: 'rider', phone: '+91-9876543210' });
        const driver = await User.create({ name: 'Ravi Kumar', email: 'driver@ucab.com', password: 'driver123', role: 'driver', phone: '+91-9123456789' });
        const admin = await User.create({ name: 'Admin UCab', email: 'admin@ucab.com', password: 'admin123', role: 'admin', phone: '+91-9000000001' });

        // Create cabs
        const cab1 = await Cab.create({ model: 'Toyota Corolla', type: 'Sedan', plate: 'MH-12-AB-1234', seats: 4, driver: driver.name, driverId: driver._id, pricePerKm: 45, rating: 4.8 });
        const cab2 = await Cab.create({ model: 'Honda BRV', type: 'SUV', plate: 'MH-01-CD-5678', seats: 6, driver: 'Arjun Singh', pricePerKm: 65, rating: 4.6 });
        const cab3 = await Cab.create({ model: 'Maruti Swift', type: 'Mini', plate: 'MH-02-EF-9012', seats: 4, driver: 'Vikram Patel', pricePerKm: 30, rating: 4.5 });

        // Create bookings
        await Booking.create([
            { riderId: rider._id, riderName: rider.name, driverId: driver._id, driverName: driver.name, cabId: cab1._id, cabModel: cab1.model, pickup: 'Bandra West, Mumbai', drop: 'Andheri West, Mumbai', date: '2025-03-01', status: 'completed', price: 320 },
            { riderId: rider._id, riderName: rider.name, driverId: driver._id, driverName: driver.name, cabId: cab2._id, cabModel: cab2.model, pickup: 'Powai, Mumbai', drop: 'Juhu, Mumbai', date: '2025-03-04', status: 'completed', price: 520 },
            { riderId: rider._id, riderName: rider.name, driverId: driver._id, driverName: driver.name, cabId: cab3._id, cabModel: cab3.model, pickup: 'Santacruz East, Mumbai', drop: 'IIT Bombay', date: '2025-03-07', status: 'pending', price: 270 },
        ]);

        console.log('✅ Database seeded successfully!');
        console.log('📧 Rider:  rider@ucab.com  / rider123');
        console.log('📧 Driver: driver@ucab.com / driver123');
        console.log('📧 Admin:  admin@ucab.com  / admin123');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seed error:', err.message);
        process.exit(1);
    }
}

seed();
