require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
var cookieParser = require('cookie-parser');
let routes = require('./routes');
const app = express();
let jsonLimit = 9 * 1024 * 1024; // Max payload is 9MB
app.use(bodyParser.json({ limit: jsonLimit }));
app.use(cookieParser());

// Trust the first proxy in the chain
if (process.env.PRODUCTION_ENV === 'true')
    app.set('trust proxy', 1);

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

app.use('/', routes);

const PORT = 17291;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
});