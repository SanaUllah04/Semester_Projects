const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const shipmentRoutes = require('./routes/shipments');

const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api', shipmentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'Shipping Service' });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Shipping Service running on port ${PORT}`);
});