const mongoose = require('mongoose')

const mongURI = "mongodb://127.0.0.1:27017/cabData"

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
    }
  };
module.exports = connectToMongo