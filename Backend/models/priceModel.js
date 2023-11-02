const mongoose = require('mongoose');

const pricesSchema = new mongoose.Schema({
    [String]: {
      type: Number
    }
});

//const Price = mongoose.model('Price', pricesSchema);

module.exports = pricesSchema;