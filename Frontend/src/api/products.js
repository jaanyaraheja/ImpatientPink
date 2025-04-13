import axios from '../config/axios';

// Get all products
const getProducts = async () => {
  const response = await axios.get('/products');
  return response.data;
};

// Add product to cart
const addToCart = async (productData) => {
  const response = await axios.post('/products/add-to-cart', productData);
  return response.data;
};

// Get cart
const getCart = async () => {
  const response = await axios.get('/products/cart');
  return response.data;
};

const productService = {
  getProducts,
  addToCart,
  getCart
};

export default productService; 