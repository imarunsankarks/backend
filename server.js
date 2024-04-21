require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); // Importing CORS

const allroutes = require('./routes/allrouter');

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(function (req, res, next) {
    next();
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, '0.0.0.0', () => {
            console.log('connected to db & listening to ', 'https://backend-v7tv.onrender.com/');
        });
    })
    .catch((err) => console.error(err));

app.use('/api/routes', allroutes);
