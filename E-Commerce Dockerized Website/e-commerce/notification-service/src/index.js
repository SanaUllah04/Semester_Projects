const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const notificationRoutes = require('./routes/notifications');

const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/notifications', notificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Notification Service' });
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});