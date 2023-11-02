const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const Order = require('./models/ordersModel');
// const cron = require('node-cron');
// const cancelPipeline = require('./utils/watchOrder');
// const pipeline = require('./utils/watchOrder');
const run = require('./utils/watchOrder');
const cronjob = require('./utils/cron.js');
//const sendEmail = require('./utils/mail');
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {console.log('DB connection successful!');
  cronjob();
  const db = mongoose.connection;
  //console.log(db);
  run(db);
});
//sendEmail();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});