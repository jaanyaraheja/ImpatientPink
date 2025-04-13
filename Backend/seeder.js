const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Fetch data from MongoDB
const fetchDataFromMongoDB = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    throw err;
  }
};

// Import data into DB
const importData = async () => {
  try {
    const products = await fetchDataFromMongoDB();
    if (products.length === 0) {
      console.log('No data found in MongoDB. Please add some products first.');
      process.exit(1);
    }
    console.log('Data fetched from MongoDB successfully!');
    console.log(`Total products fetched: ${products.length}`);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} 