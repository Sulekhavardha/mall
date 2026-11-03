const mongoose = require('mongoose');

const conciergeInquirySchema = new mongoose.Schema(
  {
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
    serviceType: {
      type: String,
      enum: [
        'Personal Styling & Fitting Suite',
        'Hands-Free Shopping Delivery',
        'VIP Valet & Parking Reserve',
        'Dining & Table Reservation',
        'Private Tour / Event Inquiry',
        'General Visit Assistance'
      ],
      default: 'General Visit Assistance',
    },
    plannedDate: {
      type: String,
      default: 'Upcoming Weekend',
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Scheduled', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ConciergeInquiry', conciergeInquirySchema);

