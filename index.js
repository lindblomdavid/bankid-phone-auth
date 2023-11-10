// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const authMiddleware = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');

app.use(express.json()); // For parsing application/json

// Apply the auth middleware to all your routes
app.use(authMiddleware);

// Use the authentication routes
app.use('/api', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('BankID Authentication Service is running');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
