const mongoose = require('mongoose');

let isConnectedToMongo = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aurelia_mall';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnectedToMongo = true;
    console.log(`✦ MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnectedToMongo = false;
    console.warn(`[Aurelia Notice] Local MongoDB service is not currently active at ${uri}.`);
    console.warn(`[Aurelia Notice] Activating resilient in-memory fallback store so all MERN endpoints (Stores, Bookings, Concierge) work smoothly without interruption!`);
    return false;
  }
};

const getMongoStatus = () => ({
  connected: isConnectedToMongo,
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aurelia_mall',
  mode: isConnectedToMongo ? 'MongoDB Atlas / Local' : 'In-Memory / Dynamic Store'
});

module.exports = { connectDB, getMongoStatus };

