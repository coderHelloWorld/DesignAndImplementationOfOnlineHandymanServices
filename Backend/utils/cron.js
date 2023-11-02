const cron = require('node-cron');
const Order = require('./../models/ordersModel');

// Run the cron job every minute to check for expired orders
async function cronjob(){
    cron.schedule('*/10 * * * *', async () => {
        console.log('Running cron job...');
        const now = new Date();
        const expiredTime = new Date(now.getTime() - 1 * 60 * 1000); // 5 minutes ago
        const expiredOrders = await Order.find({ status: 'processing', createdAt: { $lt: expiredTime } });
        for (const order of expiredOrders) {
          await Order.findByIdAndUpdate(order._id, { status: 'cancelled', updatedAt: now });
          console.log(`Order ${order._id} has been cancelled.`);
        }
    });
}

module.exports = cronjob;

//cron.schedule(' 30 * * * * *'