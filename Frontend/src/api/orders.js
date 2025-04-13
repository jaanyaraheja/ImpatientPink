import axios from 'axios';

const API_URL = '/api/v1/orders';

// Get user orders
const getOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get single order
const getOrder = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${orderId}`, config);
  return response.data;
};

const orderService = {
  getOrders,
  getOrder,
};

export default orderService;