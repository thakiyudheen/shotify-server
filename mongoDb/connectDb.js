const mongoose = require('mongoose');
const dotenv = require('dotenv').config()


const connectDb = () => {

    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('database connected successfully !');

    })

}

module.exports = {connectDb}
