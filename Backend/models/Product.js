const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  image: {
    type: String,
    required: [true, 'Please add an image URL']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['co-ord', 'ethnic', 'shirt', 'indowest', 'dress']
  },
  trending: {
    type: Boolean,
    default: false
  },
  new: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema); 