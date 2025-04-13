import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaUser, FaSignOutAlt, FaShoppingCart } from 'react-icons/fa';
import OrderList from '../Orders/OrderList';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      fetchCart();
    }
  }, [authUser]);

  const fetchCart = async () => {
    try {
      const response = await axios.get('/products/cart');
      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e96989]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* User Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-[#e96989] rounded-full p-3">
                <FaUser className="text-white text-xl" />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Cart Section */}
        {cart && cart.items && cart.items.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center mb-6">
              <FaShoppingCart className="text-[#e96989] text-2xl mr-3" />
              <h3 className="text-xl font-bold text-gray-800">Your Cart</h3>
            </div>
            <div className="space-y-4">
              {cart.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <h4 className="font-medium text-gray-800">{item.product}</h4>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  {/* <p className="font-medium text-[#e96989]">₹{item.price * item.quantity}</p> */}
                </div>
              ))}
              {/* <div className="flex justify-between items-center pt-4">
                <h4 className="font-bold text-gray-800">Total:</h4>
                <p className="font-bold text-[#e96989]">₹{cart.totalAmount}</p>
              </div> */}
            </div>
          </div>
        )}

        {/* Orders Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <FaBox className="text-[#e96989] text-2xl mr-3" />
            <h3 className="text-xl font-bold text-gray-800">Your Orders</h3>
          </div>
          <OrderList onOrderUpdate={fetchCart} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 