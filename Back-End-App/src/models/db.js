const mongoose = require('mongoose');
require('dotenv').config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const dbName = process.env.MONGO_DB_NAME;
const url = `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;

const MAX_RECONNECTION_ATTEMPTS = 10;
let reconnectionAttempts = 0;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
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

// mongoose.connection.on('disconnected', () => {
//   console.warn('MongoDB disconnected. Attempting to reconnect...');
//   connectDB();
// });

module.exports = connectDB;