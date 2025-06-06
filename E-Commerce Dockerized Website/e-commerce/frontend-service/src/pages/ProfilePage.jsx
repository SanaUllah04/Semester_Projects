import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, getOrders } from '../utils/api';

const ProfilePage = ({ token }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserProfile(token);
        setUser(userData);

        const ordersData = await getOrders(token);
        console.log('Orders fetched in ProfilePage:', ordersData); // Debug log
        setOrders(ordersData || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [token]);

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="container mx-auto p-4 text-gray-600">Loading...</div>;
  }

  // Generate unique tracking number (orderId + timestamp)
  const getTrackingNumber = (orderId) => `${orderId}-${Date.now()}`;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{user.name || 'No Name'}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-4">Order History</h3>
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
            .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)) // Safeguard for missing createdAt
            .map((order) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <h4 className="text-lg font-semibold text-gray-800">Order #{order._id}</h4>
                <p className="text-gray-600">Tracking #: {getTrackingNumber(order._id)}</p>
                <p className="text-gray-600">
                  Total: ${(order.totalPrice !== undefined ? order.totalPrice : 0).toFixed(2)}
                </p>
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
                    {order.status || 'Unknown'}
                  </span>
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;