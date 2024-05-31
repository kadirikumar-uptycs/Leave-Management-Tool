require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = require('../models/db-creds');


const MAX_RECONNECTION_ATTEMPTS = 10;
let reconnectionAttempts = 0;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB 🔗');
    reconnectionAttempts = 0;
  } catch (err) {
    console.error('⛔ Error connecting to MongoDB', err);
    reconnectionAttempts++;

    if (reconnectionAttempts <= MAX_RECONNECTION_ATTEMPTS) {
      setTimeout(connectDB, 5000);
    } else {
      console.error('⌛Maximum reconnection attempts reached. \n⛔ Unable to connect to MongoDB.');
    }
  }
};


mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
  if (reconnectionAttempts < MAX_RECONNECTION_ATTEMPTS) {
    connectDB();
  }
});
module.exports = connectDB;