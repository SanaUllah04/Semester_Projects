const express = require('express');
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a notification
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { userId, message } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ message: 'userId and message are required' });
    }

    const notification = new Notification({
      userId,
      message,
    });

    await notification.save();

    res.status(201).json({ message: 'Notification created successfully', notification });
  } catch (err) {
    console.error('Notification creation error:', err.message);
    res.status(500).json({ message: 'Failed to create notification' });
  }
});

// Get notifications for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json({ notifications });
  } catch (err) {
    console.error('Notification fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

module.exports = router;