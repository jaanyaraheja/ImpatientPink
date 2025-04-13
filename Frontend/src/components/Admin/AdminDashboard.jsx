import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaShoppingBag, FaClipboard, FaSignOutAlt, FaPencilAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import OrderManagement from './OrderManagement';
import axios from '../../config/axios';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    if (user && user.role !== 'admin') {
      navigate('/dashboard');
    }
    
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      // This is a placeholder. In production, you'd create an endpoint for these stats
      const orders = await axios.get('/admin/orders');
      
      // Calculate stats
      const allOrders = orders.data.data;
      const pendingOrders = allOrders.filter(order => 
        ['Inquiry Received', 'Consultation Scheduled', 'Production Started'].includes(order.status)
      );
      
      setStats({
        totalOrders: allOrders.length,
        pendingOrders: pendingOrders.length,
        users: 0 // Placeholder
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigateToSketchBoard = () => {
    navigate('/sketch-board');
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user ? user.name : 'Admin'}</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="rounded-full bg-blue-100 p-3">
                <FaShoppingBag className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
                <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <FaClipboard className="text-yellow-600 text-xl" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Pending Orders</h2>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingOrders}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center">
              <div className="rounded-full bg-green-100 p-3">
                <FaUsers className="text-green-600 text-xl" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
                <p className="text-3xl font-bold text-gray-900">{stats.users}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Order Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>
          <OrderManagement onUpdate={fetchStats} />
        </div>
        
        {/* Sketch Board Button */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToSketchBoard}
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white text-lg font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
          >
            <FaPencilAlt className="mr-2" />
            Go to Sketch Board
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;