// app.js or server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes= require('./routes/productRoutes');
const billRoutes= require('./routes/billRoutes')
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
// app.use(cors());

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes)
app.use('/api/bill',billRoutes)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
