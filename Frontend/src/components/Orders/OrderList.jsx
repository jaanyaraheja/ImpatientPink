import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingBag, FaRupeeSign, FaSpinner } from 'react-icons/fa';
import axios from '../../config/axios';

const getStatusColor = (status) => {
  const statusColors = {
    'Inquiry Received': 'bg-blue-100 text-blue-800',
    'Consultation Scheduled': 'bg-purple-100 text-purple-800',
    'Consultation Completed': 'bg-indigo-100 text-indigo-800',
    'Quotation Approved': 'bg-cyan-100 text-cyan-800',
    'Design Approved': 'bg-teal-100 text-teal-800',
    'Production Started': 'bg-yellow-100 text-yellow-800',
    'Fitting Scheduled': 'bg-orange-100 text-orange-800',
    'Fitting Completed': 'bg-pink-100 text-pink-800',
    'Order Ready for Pickup/Delivery': 'bg-green-100 text-green-800',
    'Out for Delivery': 'bg-emerald-100 text-emerald-800',
    'Delivered': 'bg-green-100 text-green-800'
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders');
        const sortedOrders = response.data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setOrders(sortedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError('Failed to load your orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-[#e96989] text-4xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10">
        <FaShoppingBag className="text-5xl text-gray-300 mx-auto mb-4" />
        <p className="text-xl text-gray-500">You don't have any orders yet</p>
        <a 
          href="/products" 
          className="mt-4 inline-block bg-[#e96989] text-white py-2 px-4 rounded-lg hover:bg-[#d05878] transition-colors"
        >
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Orders</h2>
      
      {orders.map((order) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID: {order._id}</p>
              <p className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-4 mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Items</h4>
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between py-2">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.product}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                {/* <p className="font-medium text-gray-800">
                  <FaRupeeSign className="inline text-xs" />
                  {item.price * item.quantity}
                </p> */}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            {/* <div className="text-sm">
              <span className="text-gray-600">Total: </span>
              <span className="font-bold text-[#e96989]">
                <FaRupeeSign className="inline text-xs" />
                {order.totalAmount}
              </span>
            </div> */}
            
            {order.notes && (
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700 mt-2">
                <strong>Notes:</strong> {order.notes}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderList;