import React, { useState, useEffect } from 'react';
import { getNotifications } from '../utils/api';

const NotificationPage = ({ token }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) {
        setError('Please log in to view notifications');
        setLoading(false);
        return;
      }

      try {
        const notificationsData = await getNotifications(token);
        setNotifications(notificationsData);
      } catch (err) {
        setError(err.message || 'Unable to fetch notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [token]);

  if (loading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-red-500 text-center">{error}</div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="container mx-auto p-6 text-gray-600 text-center">
        No notifications found.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Notifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="bg-white bg-opacity-10 backdrop-blur-sm border border-gray-200 rounded-lg p-4 shadow-sm hover:bg-opacity-20 transition duration-200"
          >
            <p className="text-lg font-medium text-gray-800">{notification.message}</p>
            <p className="text-sm font-light text-gray-500 mt-1">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;