const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['fashion', 'jewellery', 'toys', 'dining', 'cinema', 'entertainment'],
    },
    floor: {
      type: String,
      required: true,
      enum: ['ground', 'first', 'second', 'all'],
    },
    levelLabel: {
      type: String,
      default: 'Level 00',
    },
    tagline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    chips: [{ type: String }],
    stats: [
      {
        label: String,
        value: String,
      },
    ],
    gallery: [
      {
        url: String,
        badge: String,
        label: String,
        alt: String,
      },
    ],
    openingHours: {
      type: String,
      default: '10:00 AM - 10:00 PM',
    },
    isFeatured: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Store', storeSchema);

