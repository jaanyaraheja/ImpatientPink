import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaSpinner, FaSave, FaTimes } from 'react-icons/fa';
import axios from '../../config/axios';

const OrderManagement = ({ onUpdate }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingOrder, setEditingOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const statusOptions = [
    'Inquiry Received',
    'Consultation Scheduled',
    'Consultation Completed',
    'Quotation Approved',
    'Design Approved',
    'Production Started',
    'Fitting Scheduled',
    'Fitting Completed',
    'Order Ready for Pickup/Delivery',
    'Out for Delivery',
    'Delivered'
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, orders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/admin/orders');
      setOrders(response.data.data);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];
    
    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order._id.toLowerCase().includes(searchLower) ||
        (order.user && order.user.name && order.user.name.toLowerCase().includes(searchLower)) ||
        (order.user && order.user.email && order.user.email.toLowerCase().includes(searchLower)) ||
        (order.user && order.user.phone && order.user.phone.includes(searchTerm))
      );
    }
    
    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Sort by date, newest first
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    setFilteredOrders(filtered);
  };

  const handleUpdateStatus = async (orderId, newStatus, notes) => {
    try {
      setUpdatingOrderId(orderId);
      await axios.put(`/admin/orders/${orderId}`, { 
        status: newStatus,
        notes: notes 
      });
      
      // Update the local orders array
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, status: newStatus, notes: notes };
        }
        return order;
      });
      
      setOrders(updatedOrders);
      setEditingOrder(null);
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error('Error updating order:', err);
      setError('Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
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

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="md:w-1/3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
            />
          </div>
        </div>
        <div className="md:w-1/3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th> */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order._id.substring(order._id.length - 8)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.user ? (
                      <div>
                        <p className="font-medium">{order.user.name}</p>
                        <p>{order.user.email}</p>
                        <p>{order.user.phone}</p>
                      </div>
                    ) : (
                      'User data not available'
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc list-inside">
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.product} x{item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{order.totalAmount}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingOrder === order._id ? (
                      <select
                        value={order.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          setOrders(orders.map(o => o._id === order._id ? { ...o, status: newStatus } : o));
                        }}
                        className="w-full py-1 px-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#e96989] focus:border-transparent"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    {editingOrder === order._id ? (
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={() => {
                            const updatedOrder = orders.find(o => o._id === order._id);
                            handleUpdateStatus(order._id, updatedOrder.status, updatedOrder.notes);
                          }}
                          className="text-green-600 hover:text-green-900"
                          disabled={updatingOrderId === order._id}
                        >
                          {updatingOrderId === order._id ? <FaSpinner className="animate-spin" /> : <FaSave />}
                        </button>
                        <button
                          onClick={() => setEditingOrder(null)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingOrder(order._id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FaEdit />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement; 