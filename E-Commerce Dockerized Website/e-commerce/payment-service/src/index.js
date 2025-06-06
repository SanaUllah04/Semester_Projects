const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const paymentRoutes = require('./routes/payments');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Payment Service is running' });
});

// Routes
app.use('/api', paymentRoutes);

// Environment variable validation
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI environment variable is not set');
  process.exit(1);
}

// Connect to MongoDB with error handling
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB().then(() => {
  // Start server
  const PORT = process.env.PORT || 3004;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Payment Service running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to start server due to MongoDB connection error:', err);
  process.exit(1);
});