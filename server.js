const express = require('express');
const mongoose = require('mongoose');
const restaurantRouter = require('./COMP3133-lab03_100420936/routes/restaurantRoutes.js');

const app = express();
app.use(express.json()); // Make sure it comes back as json

//TODO - Replace you Connection String here
mongoose.connect('<PASTE YOUR MONGODB ATLAS COLLECTION STRING HERE>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(restaurantRouter);

app.listen(3000, () => { console.log('Server is running...') });