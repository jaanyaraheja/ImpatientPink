const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrder,
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');

router.use(protect); // Protect all routes below

router.get('/', getOrders);
router.get('/:id', getOrder);

module.exports = router;