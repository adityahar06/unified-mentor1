const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/unified-mentor';
    await mongoose.connect(uri);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Failed:', err.message);
    console.log('Server will continue running without database. Please check your MONGO_URI in .env file.');
  }
};

module.exports = connectDB;
