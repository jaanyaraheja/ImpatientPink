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
  origin: process.env.NODE_ENV === 'production'
    ? ['https://impatientpink.in', 'https://www.impatientpink.in']
    : 'http://localhost:5173',
  credentials: true
}));

// Cookie parser
app.use(cookieParser());

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Server Error' : err.message
  });
});

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/orders', orders);
app.use('/api/v1/products', products);
app.use('/api/v1/admin', admin);

const PORT = process.env.PORT || 5000;

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

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});