import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { trackShipmentByTrackingNumber, updateShipment } from '../utils/api';

const TrackShipmentPage = ({ token, isAdmin = false }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [shipment, setShipment] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please log in to track shipments');
      return;
    }
    const trimmedTrackingNumber = trackingNumber.trim();
    if (!trimmedTrackingNumber) {
      setError('Please enter a valid tracking number');
      return;
    }

    setLoading(true);
    setError('');
    setShipment(null);

    try {
      const shipmentData = await trackShipmentByTrackingNumber(token, trimmedTrackingNumber);
      setShipment(shipmentData);
      setSuccessMessage('');
    } catch (err) {
      setError(err.message || 'Failed to fetch shipment details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!isAdmin || !statusUpdate || !shipment) return;
    try {
      const updatedShipment = await updateShipment(token, shipment.orderId, { status: statusUpdate });
      setShipment(updatedShipment);
      setStatusUpdate('');
      setError('');
      setSuccessMessage('Shipment status updated successfully');
    } catch (err) {
      setError(err.message || 'Failed to update shipment status');
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Track Your Shipment</h2>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="trackingNumber" className="block text-gray-700 font-medium mb-1">
              Tracking Number
            </label>
            <input
              id="trackingNumber"
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter your tracking number"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 transition duration-200"
          >
            {loading ? 'Tracking...' : 'Track Shipment'}
          </button>
        </form>
      </div>

      {error && (
        <div className="mt-4 text-red-500 text-center">{error}</div>
      )}

      {successMessage && (
        <div className="mt-4 text-green-500 text-center">{successMessage}</div>
      )}

      {loading && (
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      )}

      {shipment && (
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6 shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipment Details</h3>
          <p><strong>Order ID:</strong> {shipment.orderId}</p>
          <p><strong>Tracking Number:</strong> {shipment.trackingNumber}</p>
          <p><strong>Status:</strong> {shipment.status}</p>
          <p><strong>Carrier:</strong> {shipment.carrier || 'N/A'}</p>
          <p>
            <strong>Estimated Delivery:</strong>{' '}
            {shipment.estimatedDelivery
              ? new Date(shipment.estimatedDelivery).toLocaleDateString()
              : 'N/A'}
          </p>
          <p><strong>Created At:</strong> {new Date(shipment.createdAt).toLocaleDateString()}</p>
          <p><strong>Updated At:</strong> {new Date(shipment.updatedAt).toLocaleDateString()}</p>
        </div>
      )}

      {isAdmin && shipment && (
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6 shadow-md w-full max-w-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Shipment Status</h3>
          <select
            value={statusUpdate}
            onChange={(e) => setStatusUpdate(e.target.value)}
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button
            onClick={handleStatusUpdate}
            disabled={!statusUpdate}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400 transition duration-200"
          >
            Update Status
          </button>
        </div>
      )}

      <Link to="/products" className="mt-6 text-blue-500 hover:underline">
        Back to Products
      </Link>
    </div>
  );
};

export default TrackShipmentPage;