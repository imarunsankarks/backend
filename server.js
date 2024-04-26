require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const allroutes = require('./routes/allrouter');

// express app
const app = express();

// middleware
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PATCH'], // specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // specify allowed headers
};

app.use(cors(corsOptions));


app.use(function (req, res, next) {
    next();
});

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening to ', process.env.PORT);
        });
    })
    .catch((err) => console.error(err));

app.use('/api/routes', allroutes);
