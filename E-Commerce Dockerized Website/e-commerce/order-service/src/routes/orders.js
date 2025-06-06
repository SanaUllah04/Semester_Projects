const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const axios = require('axios');

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

// Fetch user's orders
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.json({ orders });
  } catch (err) {
    console.error('Order fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Create order and process payment
router.post('/orders', authMiddleware, async (req, res) => {
  try {
    const { items, cardNumber, expiryDate, cvv } = req.body;
    console.log('Received order request:', req.body);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    if (!items.every(item => item.productId && item.quantity && typeof item.quantity === 'number' && item.quantity > 0 && typeof item.price === 'number')) {
      return res.status(400).json({ message: 'Invalid order items format' });
    }

    if (!cardNumber?.trim() || !expiryDate?.trim() || !cvv?.trim()) {
      return res.status(400).json({ message: 'Payment details (card number, expiry date, CVV) must be provided and cannot be empty' });
    }

    const userId = req.user.userId;
    const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const order = new Order({
      userId,
      items,
      totalPrice,
    });

    await order.save();

    const paymentServiceUrl = 'http://payment-service:3004';
    console.log('Resolved PAYMENT_SERVICE_URL:', paymentServiceUrl);

    // Extract token from the request headers
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const paymentResponse = await axios.post(`${paymentServiceUrl}/api/payments`, {
      orderId: order._id,
      paymentMethod: 'Credit Card',
      amount: totalPrice,
      cardNumber,
      expiryDate,
      cvv,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      family: 4,
      timeout: 5000,
    });

    let trackingNumber = '';
    if (paymentResponse.data.status === 'Completed') {
      order.paymentStatus = 'Paid';
      order.status = 'Confirmed';
      await order.save();

      // Create shipment in Shipping Service
      const shippingServiceUrl = process.env.SHIPPING_API_URL || 'http://shipping-service:3005';
      try {
        const shipmentResponse = await axios.post(
          `${shippingServiceUrl}/api/shipments`,
          { orderId: order._id, userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        trackingNumber = shipmentResponse.data.trackingNumber;
      } catch (shippingErr) {
        console.error('Shipment creation error:', shippingErr.response?.data?.message || shippingErr.message);
      }
    } else {
      order.paymentStatus = 'Failed';
      order.status = 'Failed';
      await order.save();
    }

    res.status(201).json({
      message: 'Order created successfully',
      orderId: order._id,
      paymentStatus: order.paymentStatus,
      trackingNumber,
    });
  } catch (err) {
    console.error('Order creation error:', err.message);
    res.status(400).json({ message: err.message || 'Failed to create order' });
  }
});

module.exports = router;