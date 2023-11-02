const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const orderController = require('./../controllers/orderController');

router
  .route('/order')
  .post(authController.protect, orderController.postOrder)
  .get(authController.protect, orderController.getOrder)

router
  .route('/order/response/')
  .post(orderController.responseHandyman)

router
  .route('/order/responseForm/:id')
  .get(orderController.sendResFormHTML)

//router.route('/order/responseForm/script.js').get(orderController.sendResFormJS)

module.exports = router;