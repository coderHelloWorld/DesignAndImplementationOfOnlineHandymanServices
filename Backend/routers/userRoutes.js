const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController')
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/location')
  .patch(authController.protect, userController.locateUser)  
 
router
  .route('/addCart')
  .post(authController.protect, userController.addCart)
  
router
.route('/clearCart')
.post(authController.protect, userController.clearCart)

router
.route('/checkLoginStatus')
.get(authController.protect, userController.checkLStatus)

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;