const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// debug
console.log("MONGO_URI:", process.env.MONGO_URI);

// routes
const internshipRoutes = require('./routes/internships');
app.use('/api/internships', internshipRoutes);

// test route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// safety check
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

// MongoDB connection (IMPORTANT FIX)
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'internshipDB'
})
.then(() => {
  console.log('MongoDB connected');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
});