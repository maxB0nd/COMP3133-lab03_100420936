const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

//Read ALL
//http://localhost:3000/restaurants
//Sort by
//http://localhost:3000/restaurants?sortBy=ASC
app.get('/restaurants', async (req, res) => {
  let restaurants = await restaurantModel.find({});

  if (Object.keys(req.query).length == 1) {
    const sortBy = !!req.query.sortBy ? req.query.sortBy.toLowerCase() : undefined;
    if (!!sortBy && (sortBy == 'asc' || sortBy == 'desc')) {
      restaurants = restaurants.select("_id name cuisine city restaurant_id").sort({ 'restaurant_id': sortBy });
    }
  }
  try {
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Search By Cuisine Name - PATH Parameter
//http://localhost:3000/restaurants/cuisine/Japanese
app.get('/restaurants/cuisine/:cuisineName', async (req, res) => {
  const cuisineName = req.params.cuisineName
  const restaurants = await restaurantModel.find({ cuisine: cuisineName });

  try {
    if (restaurants.length != 0) {
      res.send(restaurants);
    } else {
      res.send(JSON.stringify({ status: false, message: "No data found" }))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// http://localhost:3000/restaurants/Delicatessen
app.get('/restaurants/Delicatessen', async (req, res) => {
  let restaurants = await restaurantModel.find({})
    .select("cuisine name city")
    .where("cuisine").eq('Delicatessen')
    .where("city").ne('Brooklyn')
    .sort({ 'name': 'asc' });
  try {
    if (restaurants.length != 0) {
      res.send(restaurants);
    } else {
      res.send(JSON.stringify({ status: false, message: "No data found" }))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//Some more test queries
//http://localhost:8081/employees/test
app.get('/employees/test', async (req, res) => {
  try {
    const employees = employeeModel.
      find({})
      .where('lastname').equals('patel')
      .where('salary').gte(1000.00).lte(10000.00)
      .where('firstname').in(['pritesh', 'moksh'])
      .limit(10)
      .sort('-salary')
      .select('firstname lastname salary')
      .exec((err, data) => {
        if (err) {
          res.send(JSON.stringify({ status: false, message: "No data found" }));
        } else {
          res.send(data);
        }
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app