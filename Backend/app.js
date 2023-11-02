const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const userRouter = require('./routers/userRoutes');
const dataRouter = require('./routers/dataRoutes');
const orderRouter = require('./routers/orderRoutes');
const AppError = require('./utils/appError');
const app = express();

// in local env i am using helmet and all in prod env i removed all these things

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// for response form
app.use(express.static('public'));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Body parser, reading data from body into req.body
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

// CORS RELATED THING .. PRIMARY LEVEL
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/data', dataRouter);
app.use('/api/v1/order', orderRouter);


app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


module.exports = app;
