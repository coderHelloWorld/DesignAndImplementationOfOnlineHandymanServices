const express = require('express');
const dataController = require('../controllers/dataController.js');
const router = express.Router();
const authController = require('./../controllers/authController');

router
  .route('/category')
  .get(authController.protect, dataController.getAllCategories)
  .post(dataController.createCategory);

router
.route('/category/top')
.get(authController.protect, dataController.getTopCategories)

router
.route('/category/trending')
.get(authController.protect, dataController.getTrendingCategories)

router
  .route('/handyman')
  .get(authController.protect, dataController.getAllHandymans)
  .post(dataController.createHandyman);


//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;