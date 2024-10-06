const mongoose = require('mongoose');


const connectDb = () => {

    mongoose.connect('mongodb://localhost:27017/linkshortener', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('database connected successfully !');

    })

}

module.exports = {connectDb}
