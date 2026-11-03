const Booking = require('../models/Booking');
const { initialBookings } = require('../data/seedData');
const mongoose = require('mongoose');

// In-memory fallback
let inMemoryBookings = [...initialBookings];

const getBookings = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let bookings = await Booking.find().sort({ createdAt: -1 });
      if (bookings.length === 0) {
        await Booking.insertMany(initialBookings);
        bookings = await Booking.find().sort({ createdAt: -1 });
      }
      return res.json({ success: true, count: bookings.length, data: bookings, source: 'mongodb' });
    }
    res.json({ success: true, count: inMemoryBookings.length, data: inMemoryBookings, source: 'fallback-cache' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createBooking = async (req, res) => {
  try {
    const { attraction, guestName, guestContact, date, time, guestsCount, specialRequests } = req.body;

    if (!attraction || !guestName || !guestContact || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Please provide attraction, guestName, guestContact, date and time.'
      });
    }

    const bookingPayload = {
      attraction,
      guestName,
      guestContact,
      date,
      time,
      guestsCount: guestsCount || '2 Guests',
      specialRequests: specialRequests || '',
      bookingCode: 'AUR-' + Math.floor(100000 + Math.random() * 900000),
      status: 'Confirmed'
    };

    if (mongoose.connection.readyState === 1) {
      const savedBooking = await Booking.create(bookingPayload);
      return res.status(201).json({ success: true, message: 'Reservation confirmed', data: savedBooking });
    }

    const savedBooking = { ...bookingPayload, _id: 'bk_' + Date.now(), createdAt: new Date() };
    inMemoryBookings.unshift(savedBooking);
    res.status(201).json({ success: true, message: 'Reservation confirmed', data: savedBooking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      const updated = await Booking.findByIdAndUpdate(id, { status: 'Cancelled' }, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Booking not found' });
      return res.json({ success: true, message: 'Booking cancelled successfully', data: updated });
    }

    const item = inMemoryBookings.find(b => b._id === id || b.bookingCode === id);
    if (!item) return res.status(404).json({ success: false, message: 'Booking not found' });
    item.status = 'Cancelled';
    res.json({ success: true, message: 'Booking cancelled successfully', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getBookings, createBooking, cancelBooking };

