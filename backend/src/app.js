// app.js or server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController')
const cors = require("cors")

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
connectDB();

// Routes
app.get('/', (req, res) => {
  res.send('API running');
});

// Routes
app.use('/api/auth', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
