require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const Store = require('../models/Store');
const Booking = require('../models/Booking');
const ConciergeInquiry = require('../models/ConciergeInquiry');
const { storesData, initialBookings, initialInquiries } = require('../data/seedData');

const seedData = async () => {
  try {
    const connected = await connectDB();
    if (!connected) {
      console.log('MongoDB connection was not established. Skipping database seed.');
      process.exit(0);
    }

    console.log('Clearing existing collections...');
    await Store.deleteMany({});
    await Booking.deleteMany({});
    await ConciergeInquiry.deleteMany({});

    console.log('Inserting Aurelia seed data...');
    await Store.insertMany(storesData);
    await Booking.insertMany(initialBookings);
    await ConciergeInquiry.insertMany(initialInquiries);

    console.log('✦ Database successfully seeded with Aurelia catalog & reservations!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();

