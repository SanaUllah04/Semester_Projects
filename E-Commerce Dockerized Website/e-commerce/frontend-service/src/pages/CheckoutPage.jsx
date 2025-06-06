import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, createOrder } from '../utils/api';

const CheckoutPage = ({ token }) => {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '{}'));
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(''); // Store tracking number
  const navigate = useNavigate();

  const FRONTEND_BASE_URL = process.env.REACT_APP_FRONTEND_BASE_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setCart({});
        localStorage.setItem('cart', '{}');
        navigate('/track-shipment'); // Navigate to tracking page
      }, 3000); // Redirect after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const newQuantity = (newCart[productId] || 0) + delta;
      if (newQuantity <= 0) {
        delete newCart[productId];
      } else {
        newCart[productId] = newQuantity;
      }
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeItem = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('Please log in to place an order');
      return;
    }

    if (products.length === 0) {
      setError('Products are still loading, please wait...');
      return;
    }

    const orderItems = Object.keys(cart).map((productId) => {
      const product = products.find((p) => p._id === productId);
      return {
        productId,
        quantity: cart[productId],
        price: product ? product.price : 0,
      };
    });

    if (orderItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
      setError('Please fill in all payment details');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Sending order:', { items: orderItems, cardNumber, expiryDate, cvv });
      const response = await createOrder(token, { items: orderItems, cardNumber, expiryDate, cvv });
      console.log('Order creation response:', response);

      if (response.paymentStatus === 'Paid') {
        setTrackingNumber(response.trackingNumber || ''); 
        setSuccess(true);
      } else {
        setError('Order created, but payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const product = products.find((p) => p._id === productId);
      return total + (product ? product.price * cart[productId] : 0);
    }, 0);
  };

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h2>
      {success && (
        <div className="fixed inset-0 bg-green-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold text-green-600">Order placed successfully!</p>
            {trackingNumber && (
              <p className="mt-2 text-gray-700">
                Your tracking number is: <strong>{trackingNumber}</strong>
              </p>
            )}
            <p className="mt-2 text-gray-600">Redirecting to tracking page...</p>
          </div>
        </div>
      )}
      {Object.keys(cart).length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <form onSubmit={handleCheckout} className="space-y-4">
          {Object.keys(cart).map((productId) => {
            const product = products.find((p) => p._id === productId);
            return (
              product && (
                <div
                  key={productId}
                  className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`${FRONTEND_BASE_URL}${product.imageUrl}`}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-gray-600 text-sm">
                        Price: ${(product.price * cart[productId]).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(productId, -1)}
                        className="bg-gray-200 text-gray-800 font-semibold py-1 px-3 rounded-full hover:bg-gray-300 transition duration-200"
                      >
                        -
                      </button>
                      <span className="text-gray-800 font-semibold">{cart[productId]}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(productId, 1)}
                        className="bg-gray-200 text-gray-800 font-semibold py-1 px-3 rounded-full hover:bg-gray-300 transition duration-200"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(productId)}
                      className="bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 shadow-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            );
          })}
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-right mt-6">
            <p className="text-xl font-bold text-gray-800 mb-4">
              Total: ${calculateTotal().toFixed(2)}
            </p>
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200 shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;