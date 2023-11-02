const Category = require('../models/categoryModel.js').Category;
const Handyman = require('../models/handymanModel');
const Order = require('./../models/ordersModel');
const User = require('./../models/userModel');
const geocoder = require('node-geocoder');
const haversine = require('haversine');

exports.getAllCategories = async (req, res) => {
    try {
      const allCategories = await Category.find();
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: allCategories.length,
        data: {
            allCategories
        }
      });
    } catch (error) {
      // HANDLE ERROR
      res.status(500).json({
        status: 'error',
        message: 'Unable to retrieve getAllCategories data'
      });
    }
};

exports.getTopCategories = async (req, res) => {
  try {
    // Sort the categories in descending order of ratings and limit the result to 3
    const topCategories = await Category.find().sort({ ratings: -1 }).limit(3)
      // Select only the fields you want to include in the result
      .select('name _id')
      // Convert the result to a plain JavaScript object
      .lean();

    // Send the result over the API call
    res.json(topCategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createCategory = async(req, res) => {
    try{
      const newCategory = await Category.create({
          name: req.body.name,
          rating: req.body.rating,
          reviews: req.body.reviews,
          description: req.body.description,
          Sub_Category: req.body.Sub_Category,
          count_id: req.body.count_id
      });
      res.status(201).json({
        status: 'success',
        data: {
            newCategory
        }
      });
    }
    catch (error) {
        // HANDLE ERROR
        res.status(500).json({
          status: 'error',
          message: 'Unable to create category'
        });
    }
};

exports.getAllHandymans = async (req, res) => {
    try {
      const allHandymans = await Handyman.find();
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results: allHandymans.length,
        data: {
            allHandymans
        }
      });
    } catch (error) {
      // HANDLE ERROR
      res.status(500).json({
        status: 'error',
        message: 'Unable to retrieve getAllHandymans data'
      });
    }
};

exports.createHandyman = async(req, res) => {
    try{
      //const catName = req.body.CategoryName;
      const catName = req.body.category.name;
      const category = await Category.findOne({ name: catName });

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const newHandyman = await Handyman.create({
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          rating: req.body.rating,
          availability: req.body.availability,
          reviews: req.body.reviews,
          age: req.body.age,
          Sub_Category: req.body.subcategories,
          location: {
            type: 'Point',
            coordinates: req.body.coordinates
          },
          working_hours: req.body.working_hours,
          joining_date: req.body.joining_date,
          category: category,
          subcategories: req.body.subcategories,
          prices: req.body.prices,
          count_id: req.body.count_id
      });

      res.status(201).json({
        status: 'success',
        data: {
            newHandyman
        }
      });
    }
    catch (error) {
        // HANDLE ERROR
        
        res.status(500).json({
          status: 'error',
          message: 'Unable to create Handyman'
        });
        console.log(error);
    }
};

// define a geocoder
const geo = geocoder({ provider: 'openstreetmap' });

// define a radius for filtering orders
const radius = 10; // km

exports.getTrendingCategories = async (req, res) => {
  try {
    // get the last 20 orders or less
    const orders = await Order.find().sort({ date: -1 }).limit(20);

    // iterate through the orders and extract the address field
    const locations = await Promise.all(
      orders.map(async (order) => {
        const loc = await geo.geocode(order.address);
        if (!loc || loc.length === 0) {
          return null; // skip this order
        }
        return {
          order,
          location: { lat: loc[0].latitude, lon: loc[0].longitude },
        };
      })
    );
    
    // remove any orders that were skipped due to geocoding errors
    const validLocations = locations.filter((loc) => loc !== null);

    // get the user's location from the database
    const user = await User.findById(req.user._id);
    const userLoc = { lat: user.location.coordinates[0], lon: user.location.coordinates[1] };

    // filter the orders based on distance from the user's location
    const trendingOrders = validLocations.filter((loc) =>
      haversine(loc.location, userLoc, { unit: 'km' }) <= radius
    );

    // extract the subcategory field from the filtered orders
    const subcategories = trendingOrders.map((loc) => loc.order.subitemName);

    // group the subcategories by category
    const cate = await Category.find().select('_id name Sub_Category');

    const groupedSub = subcategories.reduce((acc, curr) => {
      const cateo = cate.find((c) => c.Sub_Category.some(sub => sub.Name === curr));
      if (cateo) {
        if (cateo._id in acc) {
          acc[cateo._id].push(curr);
        } else {
          acc[cateo._id] = [curr];
        }
      }
      return acc;
    }, {});  
    // sort the categories based on the number of subcategories in each category
    const TrendingCategories = Object.keys(groupedSub).sort(
      (a, b) => groupedSub[b].length - groupedSub[a].length
    );
    // create a new object to include both category ids and names
    const result = {
      cate: TrendingCategories.map((categoryId) => {
        const cateos = cate.find((c) => c._id.toString() === categoryId);
        return {
          id: cateos._id,
          name: cateos.name
        }
      })
    };
    // const grouped = subcategories.reduce((acc, curr) => {
    //   const cat = categories.find((c) => c.Sub_Category.includes(curr));
    //   if (cat) {
    //     if (cat.name in acc) {
    //       acc[cat.name].push(curr);
    //     } else {
    //       acc[cat.name] = [curr];
    //     }
    //   }
    //   return acc;
    // }, {});

    // // sort the categories based on the number of subcategories in each category
    // const trendingCategories = Object.keys(grouped).sort(
    //   (a, b) => grouped[b].length - grouped[a].length
    // );

    // if less than 3 prominent categories found, get overall trending categories
    if (TrendingCategories.length < 3) {
      console.log("in less than 3");
      const ordersa = await Order.find().sort({ date: -1 }).limit(20);
      // extract the subcategory field from the orders
      const subcategoriess = ordersa.map((order) => order.subitemName);      
      // group the subcategories by category
      const categories = await Category.find().select('_id name Sub_Category');
      const groupedSubCategories = subcategoriess.reduce((acc, curr) => {
        const category = categories.find((c) => c.Sub_Category.some(sub => sub.Name === curr));
        if (category) {
          if (category._id in acc) {
            acc[category._id].push(curr);
          } else {
            acc[category._id] = [curr];
          }
        }
        return acc;
      }, {});  
      // sort the categories based on the number of subcategories in each category
      const overallTrendingCategories = Object.keys(groupedSubCategories).sort(
        (a, b) => groupedSubCategories[b].length - groupedSubCategories[a].length
      );
      // create a new object to include both category ids and names
      const result = {
        categories: overallTrendingCategories.map((categoryId) => {
          const category = categories.find((c) => c._id.toString() === categoryId);
          return {
            id: category._id,
            name: category.name
          }
        })
      };
      res.json(result);
    } else {
      res.json(result);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};