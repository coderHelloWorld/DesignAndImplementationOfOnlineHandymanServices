const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker'
  },
  name: {
    type: String
  },
  subcategoryName: {
    type: String
  },
  price: {
    type: Number
  }
});

module.exports = cartItemSchema;
