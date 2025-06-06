const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Product = require('../models/Product');

// Dummy products with image URLs
const dummyProducts = [
 {
    name: 'Laptop',
    price: 999.99,
    description: 'High-performance laptop with 16GB RAM and 512GB SSD.',
    stock: 50,
    imageUrl: '/images/laptop.png',
  },
  {
    name: 'Smartphone',
    price: 699.99,
    description: 'Latest smartphone with 128GB storage and 48MP camera.',
    stock: 100,
    imageUrl: '/images/smartphone.png',
  },
  {
    name: 'Headphones',
    price: 149.99,
    description: 'Wireless noise-canceling headphones with 20-hour battery life.',
    stock: 75,
    imageUrl: '/images/headphones.png',
  },
  {
    name: 'Smartwatch',
    price: 249.99,
    description: 'Fitness tracking smartwatch with heart rate monitor.',
    stock: 60,
    imageUrl: '/images/smartwatch.png',
  },
  {
    name: 'Tablet',
    price: 499.99,
    description: '10-inch tablet with 64GB storage and high-resolution display.',
    stock: 40,
    imageUrl: '/images/tablet.png',
  },
  {
    name: 'Gaming Console',
    price: 399.99,
    description: 'Next-gen gaming console with 1TB storage and 4K support.',
    stock: 30,
    imageUrl: '/images/gaming-console.jpg',
  },
  {
    name: 'Bluetooth Speaker',
    price: 89.99,
    description: 'Portable Bluetooth speaker with rich bass and 12-hour playtime.',
    stock: 120,
    imageUrl: '/images/bluetooth-speaker.jpg',
  },
  {
    name: 'Digital Camera',
    price: 549.99,
    description: '24MP digital camera with 4K video recording and optical zoom.',
    stock: 25,
    imageUrl: '/images/digital-camera.jpg',
  },
  {
    name: 'External Hard Drive',
    price: 129.99,
    description: '2TB external hard drive with USB 3.0 support.',
    stock: 80,
    imageUrl: '/images/external-hard-drive.jpg',
  },
  {
    name: 'Wireless Mouse',
    price: 39.99,
    description: 'Ergonomic wireless mouse with adjustable DPI settings.',
    stock: 200,
    imageUrl: '/images/wireless-mouse.jpg',
  },
  {
    name: 'Mechanical Keyboard',
    price: 109.99,
    description: 'RGB backlit mechanical keyboard with customizable keys.',
    stock: 90,
    imageUrl: '/images/mechanical-keyboard.jpg',
  },
  {
    name: 'Webcam',
    price: 69.99,
    description: '1080p HD webcam with built-in microphone and auto-focus.',
    stock: 55,
    imageUrl: '/images/webcam.jpg',
  },
  {
    name: 'Router',
    price: 79.99,
    description: 'Dual-band Wi-Fi router with extended range and high speed.',
    stock: 65,
    imageUrl: '/images/router.jpg',
  },
  {
    name: 'Monitor',
    price: 229.99,
    description: '27-inch Full HD monitor with IPS display and HDMI support.',
    stock: 35,
    imageUrl: '/images/monitor.jpg',
  },
  {
    name: 'USB-C Hub',
    price: 59.99,
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    stock: 95,
    imageUrl: '/images/usb-c-hub.jpg',
  },
   {
    name: 'Blender',
    price: 59.99,
    description: 'High-speed kitchen blender with 3-speed settings and a glass jar.',
    stock: 45,
    imageUrl: '/images/blender.jpg',
  },
  {
    name: 'Microwave Oven',
    price: 139.99,
    description: '1000W microwave oven with digital controls and multiple presets.',
    stock: 20,
    imageUrl: '/images/microwave.jpg',
  },
];

// Connect to MongoDB and seed products
const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(dummyProducts);
    console.log('Dummy products seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding products:', err);
    process.exit(1);
  }
};

seedProducts();