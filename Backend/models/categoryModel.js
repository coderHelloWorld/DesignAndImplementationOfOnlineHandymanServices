const mongoose = require('mongoose');
const subcategorySchema = require('./subcategorySchema.js')

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
    },
    reviews: {
      type: Number,
    },
    description: {
      type: String,
    },
    Sub_Category: [subcategorySchema],
    count_id: {
      type: Number
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = {Category, categorySchema};
