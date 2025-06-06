import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../utils/api';

const OrderHistoryPage = ({ token, orders }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  // Generate unique tracking number (orderId + timestamp)
  const getTrackingNumber = (orderId) => `${orderId}-${Date.now()}`;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="text-gray-600 mb-4">No orders yet – start shopping!</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Most recent first
            .map((order) => (
              <div key={order._id} className="border p-4 rounded bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800">Order #{order._id}</h3>
                <p className="text-gray-600">Tracking #: {getTrackingNumber(order._id)}</p>
                <p className="text-gray-600">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-600">Total: ${order.totalPrice.toFixed(2)}</p>
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">Items:</h4>
                  {order.items.map((item, index) => {
                    const product = products.find((p) => p._id === item.productId);
                    return (
                      <div key={index} className="text-gray-600 text-sm">
                        <p>
                          {product ? product.name : 'Unknown Product'} (Qty: {item.quantity})
                        </p>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2">
                  Status:{' '}
                  <span
                    className={
                      order.status === 'Delivered'
                        ? 'text-green-600'
                        : order.status === 'Pending'
                        ? 'text-yellow-600'
                        : 'text-gray-600'
                    }
                  >
                    {order.status}
                  </span>
                </p>
                <a
                  href={`/track-shipment/${order._id}`}
                  className="text-blue-500 hover:underline text-sm"
                >
                  Track Shipment
                </a>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;