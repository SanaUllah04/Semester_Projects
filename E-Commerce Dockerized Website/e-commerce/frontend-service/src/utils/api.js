import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_AUTH_SERVICE_URL || 'http://localhost:3001';
const PRODUCT_API_URL = process.env.REACT_APP_PRODUCT_SERVICE_URL || 'http://localhost:3002';
const ORDER_API_URL = process.env.REACT_APP_ORDER_SERVICE_URL || 'http://localhost:3003';
const PAYMENT_API_URL = process.env.REACT_APP_PAYMENT_SERVICE_URL || 'http://localhost:3004';
const SHIPPING_API_URL = process.env.REACT_APP_SHIPPING_SERVICE_URL || 'http://localhost:3005';
const NOTIFICATION_API_URL = process.env.REACT_APP_NOTIFICATION_SERVICE_URL || 'http://localhost:3006';

export const loginUser = async (email, password) => {
  try {
    console.log('Login attempt:', { email, password: '****' });
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });
    return response.data.token;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (name, email, password) => {
  try {
    console.log('Register attempt:', { name, email, password: '****' });
    const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    });
    return response.data.token;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user;
  } catch (error) {
    console.error('Profile fetch error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch profile');
  }
};

export const getProducts = async () => {
  try {
    console.log('PRODUCT_API_URL:', PRODUCT_API_URL);
    console.log('Fetching products from:', `${PRODUCT_API_URL}/api/products`);
    const response = await axios.get(`${PRODUCT_API_URL}/api/products`);
    return response.data.products;
  } catch (error) {
    console.error('Products fetch error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export const createOrder = async (token, orderDetails) => {
  try {
    console.log('Creating order with details:', orderDetails);
    console.log('ORDER_API_URL:', ORDER_API_URL);
    const response = await axios.post(`${ORDER_API_URL}/api/orders`, orderDetails, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Order creation error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

export const getOrders = async (token) => {
  try {
    console.log('Fetching orders from:', `${ORDER_API_URL}/api/orders`);
    const response = await axios.get(`${ORDER_API_URL}/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.orders;
  } catch (error) {
    console.error('Orders fetch error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch orders');
  }
};

export const trackShipment = async (token, orderId) => {
  if (!token || !orderId) {
    throw new Error('Token and order ID are required to track shipment');
  }

  try {
    console.log('Tracking shipment for order:', orderId);
    console.log('SHIPPING_API_URL:', SHIPPING_API_URL);
    const response = await axios.get(
      `${SHIPPING_API_URL}/api/shipments/${orderId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.shipment;
  } catch (error) {
    console.error('Shipment tracking error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to track shipment');
  }
};

export const trackShipmentByTrackingNumber = async (token, trackingNumber) => {
  if (!token || !trackingNumber) {
    throw new Error('Token and tracking number are required to track shipment');
  }

  try {
    console.log('Tracking shipment by tracking number:', trackingNumber);
    console.log('SHIPPING_API_URL:', SHIPPING_API_URL);
    const response = await axios.get(
      `${SHIPPING_API_URL}/api/shipments/tracking/${trackingNumber}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.shipment;
  } catch (error) {
    console.error('Shipment tracking error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to track shipment');
  }
};

export const createShipment = async (token, shipmentDetails) => {
  if (!token || !shipmentDetails.orderId) {
    throw new Error('Token and order ID are required to create shipment');
  }

  try {
    console.log('Creating shipment with details:', shipmentDetails);
    console.log('SHIPPING_API_URL:', SHIPPING_API_URL);
    const response = await axios.post(
      `${SHIPPING_API_URL}/api/shipments`,
      shipmentDetails,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Shipment creation error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to create shipment');
  }
};

export const updateShipment = async (token, orderId, shipmentDetails) => {
  if (!token || !orderId) {
    throw new Error('Token and order ID are required to update shipment');
  }

  try {
    console.log('Updating shipment for order:', orderId, shipmentDetails);
    console.log('SHIPPING_API_URL:', SHIPPING_API_URL);
    const response = await axios.put(
      `${SHIPPING_API_URL}/api/shipments/${orderId}`,
      shipmentDetails,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.shipment;
  } catch (error) {
    console.error('Shipment update error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update shipment');
  }
};

export const getNotifications = async (token) => {
  try {
    console.log('Fetching notifications from:', `${NOTIFICATION_API_URL}/api/notifications`);
    const response = await axios.get(
      `${NOTIFICATION_API_URL}/api/notifications`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.notifications;
  } catch (error) {
    console.error('Notifications fetch error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch notifications');
  }
};