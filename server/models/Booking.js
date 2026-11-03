const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    attraction: {
      type: String,
      required: true,
      trim: true,
    },
    guestName: {
      type: String,
      required: true,
      trim: true,
    },
    guestContact: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guestsCount: {
      type: String,
      default: '2 Guests',
    },
    specialRequests: {
      type: String,
      default: '',
    },
    bookingCode: {
      type: String,
      unique: true,
      default: () => 'AUR-' + Math.floor(100000 + Math.random() * 900000),
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Cancelled', 'Completed'],
      default: 'Confirmed',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);

