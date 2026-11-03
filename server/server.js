require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, getMongoStatus } = require('./config/db');

// Route Imports
const storeRoutes = require('./routes/storeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const conciergeRoutes = require('./routes/conciergeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check & System Status Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Aurelia Luxury Shopping Mall API',
    database: getMongoStatus(),
  });
});

// Mall Stats Endpoint
app.get('/api/stats', async (req, res) => {
  try {
    const status = getMongoStatus();
    res.json({
      success: true,
      data: {
        floors: 3,
        galleriaBoutiques: '75+',
        gourmetDining: '38+',
        cinemaScreens: 12,
        smartParkingBays: '4,500',
        dbMode: status.mode
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Mount Resource API Routes
app.use('/api/stores', storeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/concierge', conciergeRoutes);

// 404 Handler for API
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

// Start Server & Connect Database
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`================================================`);
    console.log(`✦ AURELIA MALL BACKEND SERVER RUNNING ON PORT ${PORT}`);
    console.log(`✦ API Health: http://localhost:${PORT}/api/health`);
    console.log(`✦ Stores API: http://localhost:${PORT}/api/stores`);
    console.log(`✦ Bookings API: http://localhost:${PORT}/api/bookings`);
    console.log(`✦ Concierge API: http://localhost:${PORT}/api/concierge`);
    console.log(`================================================`);
  });
};

startServer();

