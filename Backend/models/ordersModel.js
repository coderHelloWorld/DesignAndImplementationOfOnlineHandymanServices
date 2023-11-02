const mongoose = require('mongoose');
const handymanModel = require('./handymanModel');
const userModel = require('./userModel');

const orderSchema = new mongoose.Schema({
        address: { 
            type: String, 
            required: true 
        },
        subitemName:
        {  
            type: String,
        },
        price: {
            type: Number
        },
        instruction: {
            type: String
        },
        prefereddate: {
            type: Date
        },
        preferedtime: {
            type:Date
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userModel'
        },
        workerid:{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'handymanModel'
        },
        workername: {
            type: String
        },
        status: {
            type: String,
            enum: ['processing', 'canceled', 'placed'],
            default: 'processing'
        },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updatedAt: Date,
    } 
);

// status_expires: {
//     type: Date,
//     index: { expireAfterSeconds: 20 }
//  }

const Order = mongoose.model('Order', orderSchema);


// orderSchema.pre('deleteOne', { document: true }, async function (next) {
//     const order = this; // "this" refers to the document being deleted
//     if (order.status === 'processing') {
//       order.status = 'cancelled';
//       await order.save();
//       console.log(`Order ${order._id} has been cancelled.`);
//     }
//     next();
// });


module.exports = Order;