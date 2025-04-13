const Product = require('../models/Product');
const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Add product to cart
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    
    // Find the product
    const product = await Product.findById(productId);
    
    if (!product) {
      return next(new ErrorResponse(`Product not found with id ${productId}`, 404));
    }
    
    // Check if user already has an order with status "Inquiry Received"
    let order = await Order.findOne({ 
      user: req.user.id,
      status: 'Inquiry Received'
    });
    
    // If no existing cart/order, create one
    if (!order) {
      order = await Order.create({
        user: req.user.id,
        items: [{
          productId: product._id,
          product: product.name,
          quantity,
          price: product.price
        }],
        totalAmount: product.price * quantity
      });
    } else {
      // Check if product is already in the cart
      const itemIndex = order.items.findIndex(item => item.productId.toString() === productId);
      
      if (itemIndex > -1) {
        // Product exists in cart, update quantity
        order.items[itemIndex].quantity += quantity;
      } else {
        // Product is not in cart, add it
        order.items.push({
          productId: product._id,
          product: product.name,
          quantity,
          price: product.price
        });
      }
      
      // Calculate total
      order.totalAmount = order.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
      
      await order.save();
    }
    
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get cart/pending order
exports.getCart = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      user: req.user.id,
      status: 'pending'
    });

    res.status(200).json({
      success: true,
      data: order || null
    });
  } catch (err) {
    next(err);
  }
}; 