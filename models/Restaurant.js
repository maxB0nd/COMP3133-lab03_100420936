const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter restaurant name'],
    trim: true
  },
  cuisine: {
    type: String,
    required: true,
    unique: [true, "Please enter cuisine name"],
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  restaurant_id: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    building: String,
    street: String,
    zipcode: String
  },
});

RestaurantSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id);
});

RestaurantSchema.post('validate', (doc) => {
  console.log('%s has been validated (but not saved yet)', doc._id);
});

RestaurantSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

RestaurantSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;