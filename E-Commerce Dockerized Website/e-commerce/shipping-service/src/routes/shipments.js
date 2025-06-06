const express = require('express');
const axios = require('axios');
const Shipment = require('../models/Shipment');
const authMiddleware = require('../middleware/authMiddleware');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Create a shipment for an order
router.post('/shipments', authMiddleware, async (req, res) => {
  try {
    const { orderId, carrier, trackingNumber, estimatedDelivery } = req.body;
    const userId = req.user.userId;

    if (!orderId) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    // Check if shipment already exists
    const existingShipment = await Shipment.findOne({ orderId });
    if (existingShipment) {
      return res.status(400).json({ message: 'Shipment already exists for this order' });
    }

    // Validate input
    if (carrier && typeof carrier !== 'string') {
      return res.status(400).json({ message: 'Carrier must be a string' });
    }
    if (trackingNumber && typeof trackingNumber !== 'string') {
      return res.status(400).json({ message: 'Tracking number must be a string' });
    }
    if (estimatedDelivery && isNaN(Date.parse(estimatedDelivery))) {
      return res.status(400).json({ message: 'Invalid estimated delivery date' });
    }

    const shipment = new Shipment({
      orderId,
      userId,
      carrier: carrier || 'N/A',
      trackingNumber: trackingNumber || `TRK-${uuidv4().slice(0, 8).toUpperCase()}`,
      estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : null,
      status: 'Processing',
    });

    await shipment.save();

    // Notify Notification Service 
    const notificationServiceUrl = 'http://notification-service:3006'; // Adjust URL as needed
    const token = req.header('Authorization')?.replace('Bearer ', '');
    axios.post(
      `${notificationServiceUrl}/api/notifications`,
      {
        userId,
        message: `Shipment created for order ${orderId}. Tracking Number: ${shipment.trackingNumber}. Status: Processing`,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).catch((notificationErr) => {
      console.error('Notification error:', notificationErr.response?.data?.message || notificationErr.message);
    });

    res.status(201).json({ message: 'Shipment created successfully', shipment, trackingNumber: shipment.trackingNumber });
  } catch (err) {
    console.error('Shipment creation error:', err.message);
    res.status(500).json({ message: err.message || 'Failed to create shipment' });
  }
});

// Get shipment details by orderId
router.get('/shipments/:orderId', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const shipment = await Shipment.findOne({ orderId, userId: req.user.userId });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    res.json({ shipment });
  } catch (err) {
    console.error('Shipment fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch shipment' });
  }
});

// Get shipment details by trackingNumber
router.get('/shipments/tracking/:trackingNumber', authMiddleware, async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const shipment = await Shipment.findOne({ trackingNumber, userId: req.user.userId });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found for this tracking number' });
    }

    res.json({ shipment });
  } catch (err) {
    console.error('Shipment fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch shipment' });
  }
});

// Update shipment status
router.put('/shipments/:orderId', authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, carrier, trackingNumber, estimatedDelivery } = req.body;
    const userId = req.user.userId;

    const shipment = await Shipment.findOne({ orderId, userId });

    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    // Validate status
    if (status && !['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Update fields
    if (status) shipment.status = status;
    if (carrier) shipment.carrier = carrier;
    if (trackingNumber) shipment.trackingNumber = trackingNumber;
    if (estimatedDelivery) {
      if (isNaN(Date.parse(estimatedDelivery))) {
        return res.status(400).json({ message: 'Invalid estimated delivery date' });
      }
      shipment.estimatedDelivery = new Date(estimatedDelivery);
    }

    await shipment.save();

    // Notify Notification Service 
    const notificationServiceUrl = 'http://notification-service:3006';
    const token = req.header('Authorization')?.replace('Bearer ', '');
    axios.post(
      `${notificationServiceUrl}/api/notifications`,
      {
        userId,
        message: `Shipment for order ${orderId} updated. Tracking Number: ${shipment.trackingNumber}. Status: ${shipment.status}`,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).catch((notificationErr) => {
      console.error('Notification error:', notificationErr.response?.data?.message || notificationErr.message);
    });

    res.json({ message: 'Shipment updated successfully', shipment });
  } catch (err) {
    console.error('Shipment update error:', err.message);
    res.status(500).json({ message: 'Failed to update shipment' });
  }
});

module.exports = router;