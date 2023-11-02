const path = require('path');
const Order = require('./../models/ordersModel');
const Wor = require('./../models/handymanModel');
const Us = require('./../models/userModel');
const f = require('./../utils/response');
const fc = require('./../utils/responseRecieved');
const AppError = require('./../utils/appError');

exports.postOrder = async (req, res, next) => {
    try {
      const {add, items} = req.body;
      const newUser = req.user;
      for (const item of items) {
        const order = new Order({
          address: add,
          subitemName: item.subcategory,
          instruction: item.instruction,
          workerid: item.id,
          prefereddate: item.date,
          preferedtime: item.time,
          userId: newUser._id,
          price: item.price,
          workername: item.workerName
        });
        await order.save();
      }
      res.status(201).json({
        status: 'success'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'unable to post order'
      });
    }
  };

  exports.getOrder = async (req, res, next) => {
    try {
      const newUser = req.user;
      const orders = await Order.find({ userId: newUser._id });
      const ordersWithoutFields = orders.map((order) => {
        const { _id, userId, workerid, ...orderWithoutFields } = order.toObject();
        return orderWithoutFields;
      });
      res.status(201).json({
        status: 'success',
        data: ordersWithoutFields
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'unable to post order'
      });
    }
  };

exports.responseHandyman = async(req, res) => {
 try{
    console.log("response handyman", req.body)
    const orderId = req.body.orderID;
    const response = req.body.response;
    const password = req.body.password;
    const emailData = req.body.EmailID;
    const data = {
      id: orderId,
      emailid: emailData,
      requested: response
    }
    
    const ORDER = await Order.findById(orderId);
    
    const workerID = ORDER.workerid;
    
    const userID = ORDER.userId;
    
    if(!ORDER){
      return next(new AppError('Please provide correct orderId! Order Not Found', 400));
    }
    
    const WORKER = await Wor.findById(workerID).select('+password');
    
    //console.log(WORKER.email, emailData, password, WORKER.password);
    if(!(WORKER.email === emailData) || !(await WORKER.correctPassword(password, WORKER.password))){
      return next(new AppError('EmailID and Password doesnot match with database record for this order', 400));
    }
    if(!(ORDER.status === 'processing')){
      return next(new AppError('YOU EITHER RAN OUT OF TIME (More Than 6 Hours) OR YOU ONCE ENTERED YOUR RESPONSE', 400));
    }
    if(response === 'approve'){
      const finalResult = await Order.findByIdAndUpdate(orderId, { status: 'placed' });
      const datatosend = fc(data)
      res.send(datatosend);
    }
    if(response === 'decline'){
       result = await Order.findByIdAndUpdate(orderId, { status: 'cancelled' });
       const datatosend = fc(data)
       res.send(datatosend);
    }
    //const resolvedPath = path.resolve(__dirname, '../public/recieved.html');
 }
 catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'unable to send recieved HTML form!'
    });
   }

};

exports.sendResFormHTML = async (req, res) => {
  try{
    console.log(req.params.id)
    const orderId = req.params.id;
    const data = {
      id: orderId
    }
    //const resolvedPath = path.resolve(__dirname, '../public/response.html');
    const datatosend = f(data);
    res.send(datatosend);
  }
  catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'unable to send response HTML form!'
    });
  }

};
  
// const mime = require('mime');
// exports.sendResFormJS = (req, res) => {
//   res.set('Content-Type', mime.getType('js'));
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   res.sendFile(path.resolve(__dirname, '../public/script.js'));
// };

  