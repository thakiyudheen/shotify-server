const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Database connected successfully!');
        })
        .catch((error) => {
            console.error('Database connection error:', error);
        });
};

module.exports = { connectDb };
