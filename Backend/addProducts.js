const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config({ path: './.env' });

mongoose.connect(process.env.MONGO_URI);

const products = [
  {
    name: "Designer Lehenga",
    description: "Heavy embroidered party wear lehenga",
    price: 15999,
    image: "https://picsum.photos/id/71/800/1000",
    category: "ethnic",
    trending: true,
    new: false
  },
  {
    name: "Office Wear Set",
    description: "Professional formal wear set",
    price: 4499,
    image: "https://picsum.photos/id/72/800/1000",
    category: "formal",
    trending: false,
    new: true
  },
  {
    name: "Embroidered Kurti Set",
    description: "Designer kurti set with beautiful embroidery",
    price: 3999,
    image: "https://picsum.photos/id/73/800/1000",
    category: "kurti",
    trending: true,
    new: false
  },
  // Add more products with real fashion images
  {
    name: "Summer Collection Dress",
    description: "Light and comfortable summer dress",
    price: 2799,
    image: "https://picsum.photos/id/74/800/1000",
    category: "formal",
    trending: true,
    new: true
  },
  {
    name: "Traditional Anarkali",
    description: "Elegant traditional anarkali suit",
    price: 7999,
    image: "https://picsum.photos/id/75/800/1000",
    category: "ethnic",
    trending: false,
    new: true
  }
];

const addProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Add new products
    await Product.insertMany(products);
    
    console.log('Products added successfully!');
    process.exit();
  } catch (error) {
    console.error('Error adding products:', error);
    process.exit(1);
  }
};

addProducts(); 