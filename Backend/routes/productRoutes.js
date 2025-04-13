const express = require('express');
const router = express.Router();
const {
  getProducts,
  addToCart,
  getCart
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');

router.get('/', getProducts);
router.post('/add-to-cart', protect, addToCart);
router.get('/cart', protect, getCart);

module.exports = router; 