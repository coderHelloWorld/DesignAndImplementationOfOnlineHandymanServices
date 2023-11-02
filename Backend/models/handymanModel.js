const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcryptjs');
// const categoryModel = require('./categoryModel.js').Category;
// const priceSchema = require('./priceModel.js');
const subcategorySchema = require('./subcategorySchema.js')

const workerSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  role: {
    type: String,
    enum: ['handyman'],
    default: 'handyman'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  working_hours: {
    type: String,
    required: true,
  },
  joining_date: {
    type: Date,
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  subcategories: [subcategorySchema],
  prices: {
    type: Map,
    of: Number,
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number]
    }
  },
  count_id:{
    type: String
  }
});

// email: {
//   type: String,
//   required: [true, 'Please provide your email'],
//   unique: true,
//   lowercase: true,
//   validate: [validator.isEmail, 'Please provide a valid email']
// }
// unique: true i am removing for demo purposes

// also in mongoAtlas i have removed index of email. however please refer when you want to add that index back in. you can use mongo Atlas for ease

workerSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

workerSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};


const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
