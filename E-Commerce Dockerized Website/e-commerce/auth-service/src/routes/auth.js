const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  try {
    // Case-insensitive email check
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user (password will be hashed by User schema middleware)
    const user = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });

    await user.save();

    // Generate JWT
    const payload = {
      userId: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Case-insensitive email lookup
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials: Email not found' });
    }

    // Compare password using schema method
    const isMatch = await user.comparePassword(password.trim());
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials: Incorrect password' });
    }

    // Generate JWT
    const payload = {
      userId: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error('Profile fetch error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = router;