const express = require('express');
const router = express.Router();
const { 
  getAllOrders, 
  updateOrderStatus 
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const admin = require('../middleware/admin');

// All routes below use both protect and admin middleware
router.use(protect);
router.use(admin);

router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);

module.exports = router; 