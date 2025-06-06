const express = require('express');
const jwt = require('jsonwebtoken');
const Payment = require('../models/Payment');

const router = express.Router();

// Middleware to authenticate token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Process payment
router.post('/payments', authMiddleware, async (req, res) => {
  try {
    const { orderId, paymentMethod, amount, cardNumber, expiryDate, cvv } = req.body;
    console.log('Received payment request:', req.body); // Debug log

    if (!orderId || !paymentMethod || !amount || !cardNumber || !expiryDate || !cvv) {
      return res.status(400).json({ message: 'Invalid payment details' });
    }

    // Simulate payment processing (80% chance of success)
    const paymentSuccess = Math.random() > 0.2;
    const status = paymentSuccess ? 'Completed' : 'Failed';

    // Create payment record
    const payment = new Payment({
      userId: req.user.userId,
      orderId,
      paymentMethod,
      amount,
      cardNumber,
      expiryDate,
      cvv,
      status,
    });

    await payment.save();

    if (paymentSuccess) {
      res.status(200).json({
        message: 'Payment processed successfully',
        paymentId: payment._id,
        status: payment.status,
      });
    } else {
      res.status(400).json({
        message: 'Payment failed (simulated)',
        paymentId: payment._id,
        status: payment.status,
      });
    }
  } catch (err) {
    console.error('Payment processing error:', err);
    res.status(500).json({ message: 'Failed to process payment', error: err.message });
  }
});

module.exports = router;