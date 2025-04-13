import axios from '../config/axios';

// Register user
const register = async (userData) => {
  try {
    const response = await axios.post('/auth/register', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login user
const login = async (userData) => {
  try {
    const response = await axios.post('/auth/login', userData);
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout user
const logout = async () => {
  try {
    await axios.get('/auth/logout');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('user'); // Remove user data even if API call fails
  }
};

// Get current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;