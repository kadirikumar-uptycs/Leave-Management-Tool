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
  console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
  if (reconnectionAttempts < MAX_RECONNECTION_ATTEMPTS) {
    connectDB();
  }
});


mongoose.connection.on('reconnected', () => {
  console.log('⌛ Reconnected to MongoDB 🔗');
  reconnectionAttempts = 0;
});

mongoose.connection.on('error', (err) => {
  console.error('⛔ MongoDB connection error:', err);
});

module.exports = connectDB;


// const mongoOptions = {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	autoIndex: true,
// 	connectTimeoutMS: 10000,
// 	socketTimeoutMS: 30000,
// 	auth: {
// 		username: process.env.MONGO_USERNAME,
// 		password: process.env.MONGO_PASSWORD
// 	},
// };

// let db;
// async function connectToMongoDB() {
// 	if (
// 		db &&
// 		![mongoose.STATES.connected, mongoose.STATES.connecting, mongoose.STATES.disconnecting].includes(db.readyState)
// 	) {
// 		db = undefined;
// 	}

// 	if (!db) {
// 		try {
// 			const mongoURI = `mongodb://${config.MONGODB_URI.join(',')}/admin?authSource=admin&w=1${config.MONGODB_URI.length > 1 ? '&replicaSet=rs0' : ''
// 				}`;
// 			db = await mongoose.createConnection(mongoURI, mongoOptions).asPromise();
// 			log.debug(`Mongoose connection open to ${JSON.stringify(mongoURI)}`);
// 			log.info(`Mongoose connection state ${db.readyState}`);
// 		} catch (err) {
// 			log.error('Error : ', err);
// 			throw err;
// 		}
// 	}
// 	return db;
// }