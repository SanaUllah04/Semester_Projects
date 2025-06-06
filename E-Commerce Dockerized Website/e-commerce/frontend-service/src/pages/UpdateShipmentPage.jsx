import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { trackShipment, updateShipment } from '../utils/api';

const UpdateShipmentPage = ({ token }) => {
  const { orderId: paramOrderId } = useParams();
  const [orderId, setOrderId] = useState(paramOrderId || '');
  const [shipment, setShipment] = useState(null);
  const [formData, setFormData] = useState({
    carrier: '',
    trackingNumber: '',
    status: '',
    estimatedDelivery: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  // Fetch shipment details when orderId is provided
  useEffect(() => {
    if (orderId && token) {
      fetchShipment();
    }
  }, [orderId, token]);

  const fetchShipment = async () => {
    setFetching(true);
    setError('');
    setSuccess('');
    try {
      const shipmentData = await trackShipment(token, orderId);
      setShipment(shipmentData);
      setFormData({
        carrier: shipmentData.carrier || '',
        trackingNumber: shipmentData.trackingNumber || '',
        status: shipmentData.status || '',
        estimatedDelivery: shipmentData.estimatedDelivery
          ? new Date(shipmentData.estimatedDelivery).toISOString().split('T')[0]
          : '',
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch shipment details');
      setShipment(null);
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please log in to update shipments');
      return;
    }
    if (!orderId) {
      setError('Order ID is required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedShipment = await updateShipment(token, orderId, {
        carrier: formData.carrier || undefined,
        trackingNumber: formData.trackingNumber || undefined,
        status: formData.status || undefined,
        estimatedDelivery: formData.estimatedDelivery || undefined,
      });
      setShipment(updatedShipment);
      setSuccess('Shipment updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update shipment');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchShipment = (e) => {
    e.preventDefault();
    if (orderId) {
      fetchShipment();
    } else {
      setError('Please enter an Order ID');
    }
  };

  if (!token) {
    return (
      <div className="container mx-auto p-6 text-red-500 text-center">
        Please log in to update shipments.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Update Shipment</h2>
      <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-sm max-w-2xl mx-auto">
        {/* Order ID Input */}
        <div className="mb-6">
          <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
            Order ID
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              disabled={fetching || loading}
              aria-describedby="orderId-error"
            />
            <button
              onClick={handleFetchShipment}
              disabled={fetching || loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition duration-200"
            >
              {fetching ? 'Fetching...' : 'Fetch Shipment'}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md" role="alert" id="orderId-error">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md" role="alert">
            {success}
          </div>
        )}

        {fetching && (
          <div className="flex justify-center items-center mb-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
          </div>
        )}

        {shipment && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Carrier */}
            <div>
              <label htmlFor="carrier" className="block text-sm font-medium text-gray-700 mb-1">
                Carrier
              </label>
              <input
                type="text"
                id="carrier"
                name="carrier"
                value={formData.carrier}
                onChange={handleInputChange}
                placeholder="e.g., UPS, FedEx"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Tracking Number */}
            <div>
              <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Tracking Number
              </label>
              <input
                type="text"
                id="trackingNumber"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleInputChange}
                placeholder="e.g., TRK-12345678"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              >
                <option value="">Select Status</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Delivery */}
            <div>
              <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Delivery
              </label>
              <input
                type="date"
                id="estimatedDelivery"
                name="estimatedDelivery"
                value={formData.estimatedDelivery}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition duration-200"
              >
                {loading ? 'Updating...' : 'Update Shipment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateShipmentPage;