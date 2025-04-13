require('dotenv').config({ path: './.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars

// Connect to database
connectDB();

// Route files
const auth = require('./routes/authRoutes');
const orders = require('./routes/orderRoutes');
const products = require('./routes/productRoutes');
const admin = require('./routes/adminRoutes');

const app = express();

// Enable CORS with specific origin
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL (Vite default port)
  credentials: true // Allow credentials (cookies)
}));

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/orders', orders);
app.use('/api/v1/products', products);
app.use('/api/v1/admin', admin);

const PORT = process.env.PORT;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});