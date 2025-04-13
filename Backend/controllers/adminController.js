const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all orders (admin only)
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name email phone');
    
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update order status (admin only)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorResponse(`Order not found with id of ${req.params.id}`, 404));
    }

    order.status = status;
    if (notes) {
      order.notes = notes;
    }

    await order.save();

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
}; 