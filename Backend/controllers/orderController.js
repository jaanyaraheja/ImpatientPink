const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all orders for logged in user
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single order
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!order) {
      return next(
        new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};