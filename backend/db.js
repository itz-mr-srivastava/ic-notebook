const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/ic-notebook";


const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to Mongo Successfully");
        })
        .catch((error) => {
            console.log("MongoDB Connection Failed:", error);
        });
}

module.exports = connectToMongo;