const Store = require('../models/Store');
const { storesData } = require('../data/seedData');
const mongoose = require('mongoose');

// In-memory fallback repository
let inMemoryStores = [...storesData];

const getStores = async (req, res) => {
  try {
    const { floor, category, search } = req.query;

    if (mongoose.connection.readyState === 1) {
      const query = {};
      if (floor && floor !== 'all') query.floor = floor;
      if (category) query.category = category;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { chips: { $in: [new RegExp(search, 'i')] } }
        ];
      }
      let stores = await Store.find(query);
      if (stores.length === 0 && !floor && !category && !search) {
        // Auto-seed if collection is empty
        await Store.insertMany(storesData);
        stores = await Store.find({});
      }
      return res.json({ success: true, count: stores.length, data: stores, source: 'mongodb' });
    }

    // In-memory fallback
    let filtered = [...inMemoryStores];
    if (floor && floor !== 'all') {
      filtered = filtered.filter(s => s.floor === floor);
    }
    if (category) {
      filtered = filtered.filter(s => s.category === category);
    }
    if (search) {
      const sLower = search.toLowerCase();
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(sLower) || 
        s.description.toLowerCase().includes(sLower)
      );
    }
    res.json({ success: true, count: filtered.length, data: filtered, source: 'fallback-cache' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1) {
      const store = await Store.findById(id);
      if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
      return res.json({ success: true, data: store });
    }

    const store = inMemoryStores.find(s => s._id === id || s.name.toLowerCase() === id.toLowerCase());
    if (!store) return res.status(404).json({ success: false, message: 'Store not found' });
    res.json({ success: true, data: store });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createStore = async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const newStore = await Store.create(req.body);
      return res.status(201).json({ success: true, data: newStore });
    }
    const newStore = { ...req.body, _id: 'temp_' + Date.now() };
    inMemoryStores.push(newStore);
    res.status(201).json({ success: true, data: newStore });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getStores, getStoreById, createStore };

