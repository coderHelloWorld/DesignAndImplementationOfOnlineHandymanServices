const mongoose = require('mongoose');

const subcategorySchema = new mongoose.Schema({
    Name: {
      type: String
    }
});

//const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = subcategorySchema;