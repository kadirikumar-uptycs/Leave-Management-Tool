require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const connectDB = require('./models/db');

const app = express();
let jsonLimit = 5 * 1024 * 1024; // Max payload is 5MB
app.use(bodyParser.json({ limit: jsonLimit }));
app.use(cookieParser());

// Trust the first proxy in the chain 
if (process.env.PRODUCTION_ENV === 'true') app.set('trust proxy', 1);

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:17290", "https://cxtools.uptycs.dev"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(session({
  name: 'Sri-Staff-Tool',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  }
}));

let routes = require('./routes');
app.use('/', routes);

const PORT = 17291;

// Connect to MongoDB and then start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server listening at port ${PORT}`);
  });
}).catch((err) => {
  console.error('⛔ Failed to connect to MongoDB:', err);
});