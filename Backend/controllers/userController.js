const User = require('./../models/userModel');
const Worker = require('./../models/handymanModel');
const AppError = require('./../utils/appError');

exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find();
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          users
        }
      });
    } catch (error) {
      // HANDLE ERROR
      res.status(500).json({
        status: 'error',
        message: 'Unable to retrieve getAllUsers data'
      });
    }
};

exports.createUser = async(req, res) => {
  try{
    const newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        name: req.body.name
    });
    res.status(201).json({
      status: 'success',
      data: {
        newUser
      }
    });
  }
  catch (error) {
      // HANDLE ERROR
      res.status(500).json({
        status: 'error',
        message: 'Unable to create users'
      });
  }
};

exports.locateUser = async(req, res) => {
  try{
    const newUser = req.user
    //console.log(req.body)
    newLocation = {
      type: 'Point',
      coordinates: req.body.coordinates
    };
    const upUser = await User.findOneAndUpdate({_id: newUser._id}, {location: newLocation}, { new: true });
    //const updatedUser = await newUser.save();
    res.status(201).json({
      status: 'success'
    });
  }
  catch{
    res.status(500).json({
      status: 'error',
      message: 'Unable to add location of users'
    });
  }
};

exports.addCart = async (req, res, next) => {
  try {
    const newUser = req.user;
    console.log(req.body.workerId);
    const workerd = await Worker.findOne({ _id: req.body.workerId });
    console.log(workerd);
    if (!workerd) {
      return next(new AppError('Please provide correct workerID!', 400));
    }
    if (!(workerd.subcategories.some(s => s.Name === req.body.subcategoryName))){
      console.log(`Worker doesnot contains subcategory ${req.body.subcategoryName} with price ${req.body.price}`);
      return next(new AppError('Data Tempered with Subname', 400));
    }
    if(!(workerd.prices.get(req.body.subcategoryName) === req.body.price)){
      console.log(`Worker contains subcategory ${req.body.subcategoryName} with price ${req.body.price}`);
      return next(new AppError('Data Tempered in price', 400));
    }
    const newCartItem = {
      worker: workerd,
      name: workerd.name,
      subcategoryName: req.body.subcategoryName,
      price: workerd.prices.get(req.body.subcategoryName)
    };
    const updatedUser = await User.findOneAndUpdate(
      { _id: newUser._id },
      { $push: { cart: newCartItem } },
      { new: true }
    );
    updatedUser.password = undefined;
    updatedUser.location = undefined;
    updatedUser.email = undefined;
    updatedUser.role = undefined;
    res.status(201).json({
      status: 'success',
      data: {
        updatedUser
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const newUser = req.user;
    console.log(req.body.workerId)
    const updatedUser = await User.findOneAndUpdate(
      { _id: newUser._id },
      { $unset: { cart: {} } },
      { new: true }
    );
    res.status(201).json({
      status: 'success',
      data: {
        updatedUser
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.checkLStatus = async(req, res) => {
  try{
    const newUser = req.user
    res.status(201).json({
      status: 'success',
      data: {
        newUser
      }
    });
  }
  catch{
    res.status(500).json({
      status: 'error',
      message: 'Unable to check loginStatus of user'
    });
  }
};



// exports.removeItemFromCart = async (req, res) => {
//   try {
//     const updatedUser = await User.findOneAndUpdate(
//       { _id: req.user._id },
//       { $pull: { cart: { _id: req.params.itemId } } },
//       { new: true }
//     );

//     res.status(200).json({
//       status: 'success',
//       data: {
//         updatedUser
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: error.message
//     });
//   }
// };

exports.getUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
};

exports.updateUser = (req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'This route is not yet defined!'
    });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!'
  });
};
