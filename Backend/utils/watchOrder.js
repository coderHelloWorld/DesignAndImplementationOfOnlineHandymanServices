const mongoose = require('mongoose');
const od = require('./../models/ordersModel');
const wor = require('./../models/handymanModel');
const us = require('./../models/userModel');
const sendEmail = require('./mail');
const sendFianlEmail = require('./finalUpdateMail');

async function run(db){
  console.log("in run");
  //console.log("from run",db);
  const collection = db.collection('orders');
  const changeStream = collection.watch({ fullDocument: 'updateLookup' });
  //console.log("collection from run", collection)
  changeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
      // handle insert event
      console.log('Insert event:', change.fullDocument);
      const updatedStatus = change.fullDocument;
      const worker = await wor.findById(updatedStatus.workerid);
      if (updatedStatus.status === 'processing') {
        const orderData = {
            orderId: updatedStatus._id,
            Address: updatedStatus.address,
            subname: updatedStatus.subitemName,
            price: updatedStatus.price,
            instruction: updatedStatus.instruction,
            date: updatedStatus.prefereddate,
            time: updatedStatus.preferedtime
        }
        sendEmail(orderData, worker.email);
      }
   } else if (change.operationType === 'update') {
      // handle update event
      console.log('Update event:', change.fullDocument);
      const updatedStatus = change.fullDocument;
      const updatedFields = change.updateDescription.updatedFields;
      console.log('Updated fields:', updatedFields);
      if (updatedFields.hasOwnProperty('status')) {
        console.log('Status field was updated.');
        const orderData = {
          orderId: updatedStatus._id,
          Address: updatedStatus.address,
          subname: updatedStatus.subitemName,
          price: updatedStatus.price,
          instruction: updatedStatus.instruction,
          date: updatedStatus.prefereddate,
          time: updatedStatus.preferedtime,
          status: updatedStatus.status
      }
      const worker = await wor.findById(updatedStatus.workerid);
      const user = await us.findById(updatedStatus.userId);
      sendFianlEmail(orderData, worker.email);
      sendFianlEmail(orderData, user.email);

      } else {
        // Code to execute if 'status' field was not updated
        console.log('Status field was not updated.');
      }
      
    }
  });


}

module.exports = run;

  // console.log("in run");
  // const Order = od;
  // const changeStream = Order.watch([
  //   { $match: {'fullDocument': { $exists: true } } },
  // ]);
  
  // changeStream.on('change', async function (change) {
  //   console.log(change.operationType);
  //   if (change.operationType === 'insert') {
  //     const oId = change.documentKey._id;
  //     const updatedStatus = change.fullDocument;
  //     // console.log(updatedStatus);
  //     const worker = await wor.findById(updatedStatus.workerid);
  //     // console.log("worker", worker);

  //     if (updatedStatus.status === 'processing') {
  //       const orderData = {
  //           orderId: oId,
  //           Address: updatedStatus.address,  //     // console.log(updatedStatus);
  //     const worker = await wor.findById(updatedStatus.workerid);
  //     // console.log("worker", worker);

  //     if (updatedStatus.status === 'processing') {
  //       const orderData = {
  //           orderId: oId,
  //           Address: updatedStatus.address,
  //           subname: updatedStatus.subitemName,
  //           price: updatedStatus.price,
  //           instruction: updatedStatus.instruction,
  //           date: updatedStatus.prefereddate,
  //           time: updatedStatus.preferedtime
  //       }
  //       sendEmail(orderData, worker.email);
  //           subname: updatedStatus.subitemName,
  //           price: updatedStatus.price,
  //           instruction: updatedStatus.instruction,
  //           date: updatedStatus.prefereddate,
  //           time: updatedStatus.preferedtime
  //       }
  //       sendEmail(orderData, worker.email);
  //     } else if (updatedStatus === 'processed' || updatedStatus === 'cancelled') {
  //       // Remove the TTL from the status field
  //       const newOrder = await Order.updateOne(
  //         { _id: orderId },
  //         { $unset: { status_expires: '' } }
  //       );
  //       console.log(newOrder);
  //     }
  //   } else if (change.operationType === 'update') {
  //     console.log("in update");
  //     const updatedOrder = change.fullDocument;
  //     console.log("updated order is:",updatedOrder);
  //     // Check if the status has expired
  //     //const order = await Order.findById(expiredOrderId);
  //     //const statusExpires = order.status_expires;
  //     //const now = new Date();
  //     // if (statusExpires && now >= statusExpires) {
  //     //   await Order.updateOne(
  //     //     { _id: expiredOrderId, status: 'processing' },
  //     //     { $set: { status: 'cancelled', updatedAt: now }, $unset: { status_expires: '' } }
  //     //   );
  //     //   console.log(`Order ${expiredOrderId} has been cancelled.`);
  //     // }
  //   }
  // });


//{ $match: { 'fullDocument.status': 'processing' }}

// const changeStream = Order.watch([
//     { $match: { 'fullDocument.status': 'processing' }},
//   ]);
  
//   changeStream.on('change', async function (change) {
//     console.log(change.operationType);
//     if (change.operationType === 'insert') {
//       const orderId = change.documentKey._id;
//       const updatedStatus = change.fullDocument;
//       console.log(updatedStatus);
//       if (updatedStatus === 'processing') {
//         // Set the TTL on the status field
//         const newOrder1 = await Order.findOneAndUpdate(
//           { _id: orderId },
//           { $set: { status: 'processing', status_expires: new Date() } }
//         );
//         console.log(newOrder1);
//       } else if (updatedStatus === 'processed' || updatedStatus === 'cancelled') {
//         // Remove the TTL from the status field
//         const newOrder = await Order.updateOne(
//           { _id: orderId },
//           { $unset: { status_expires: '' } }
//         );
//         console.log(newOrder);
//       }
//     } else if (change.operationType === 'invalidate') {
//       const expiredOrderId = change.documentKey._id;
//       console.log(expiredOrderId);
//       // Check if the status has expired
//       const order = await Order.findById(expiredOrderId);
//       const statusExpires = order.status_expires;
//       const now = new Date();
//       if (statusExpires && now >= statusExpires) {
//         await Order.updateOne(
//           { _id: expiredOrderId, status: 'processing' },
//           { $set: { status: 'cancelled', updatedAt: now }, $unset: { status_expires: '' } }
//         );
//         console.log(`Order ${expiredOrderId} has been cancelled.`);
//       }
//     }
//   });



// const changeStream = Order.watch([
//     {
//       $match: {
//         $or: [
//           { 'fullDocument.status': 'processing' },
//           { 'fullDocument.status_expires': { $lte: new Date() } },    
//           { operationType: 'delete' },
//           { operationType: 'invalidate' }
//         ],
//       },
//     },
//   ]);
//   changeStream.on('change', async function(change) {
//     console.log("in changeStream")
//     console.log(change.operationType);
//     if (change.operationType === 'insert') {
//       console.log("in insert")
//       const orderId = change.documentKey._id;
//       const updatedStatus = change.fullDocument.status;
//       console.log(updatedStatus);
//       if (updatedStatus === 'processing') {
//         // Set the TTL on the status field
//         await Order.updateOne(
//           { _id: orderId },
//           { $set: { status: 'processing', status_expires: new Date(Date.now() + 20 * 1000) } }
//         );
//       } else if (updatedStatus === 'processed' || updatedStatus === 'cancelled') {
//         // Remove the TTL from the status field
//         await Order.updateOne(
//           { _id: orderId },
//           { $unset: { status_expires: '' } }
//         );
//       }
//     } else if (change.operationType === 'delete') {
//       console.log("in delete mode");
//       const expiredOrderId = change.documentKey._id;
//       console.log("expired order id",expiredOrderId);
//       // Check if the status has expired
//       const order = await Order.findById(expiredOrderId);
//       if (order) {
//         const statusExpires = order.status_expires;
//         const now = new Date();
//         if (statusExpires && now >= statusExpires) {
//           await Order.updateOne(
//             { _id: expiredOrderId, status: 'processing' },
//             { $set: { status: 'cancelled', updatedAt: now }, $unset: { status_expires: '' } }
//           );
//           console.log(`Order ${expiredOrderId} has been cancelled.`);
//         }
//       } else {
//         console.log(`Order ${expiredOrderId} not found in database.`);
//       }
//     }    
//   });
  