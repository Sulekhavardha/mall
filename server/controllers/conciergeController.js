const ConciergeInquiry = require('../models/ConciergeInquiry');
const { initialInquiries } = require('../data/seedData');
const mongoose = require('mongoose');

// In-memory fallback
let inMemoryInquiries = [...initialInquiries];

const getInquiries = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      let items = await ConciergeInquiry.find().sort({ createdAt: -1 });
      if (items.length === 0) {
        await ConciergeInquiry.insertMany(initialInquiries);
        items = await ConciergeInquiry.find().sort({ createdAt: -1 });
      }
      return res.json({ success: true, count: items.length, data: items, source: 'mongodb' });
    }
    res.json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries, source: 'fallback-cache' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createInquiry = async (req, res) => {
  try {
    const { guestName, guestContact, serviceType, plannedDate, notes } = req.body;

    if (!guestName || !guestContact) {
      return res.status(400).json({
        success: false,
        message: 'Please provide guest name and contact information.'
      });
    }

    const payload = {
      guestName,
      guestContact,
      serviceType: serviceType || 'General Visit Assistance',
      plannedDate: plannedDate || 'Upcoming Weekend',
      notes: notes || '',
      status: 'New'
    };

    if (mongoose.connection.readyState === 1) {
      const item = await ConciergeInquiry.create(payload);
      return res.status(201).json({ success: true, message: 'VIP inquiry received', data: item });
    }

    const item = { ...payload, _id: 'inq_' + Date.now(), createdAt: new Date() };
    inMemoryInquiries.unshift(item);
    res.status(201).json({ success: true, message: 'VIP inquiry received', data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getInquiries, createInquiry };

