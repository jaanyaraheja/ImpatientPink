const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    productId: {
      type: String,
      required: true
    },
    product: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: [
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
    ],
    default: 'Inquiry Received'
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);