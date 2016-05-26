var mongoose = require('mongoose');

//TODO: maybe make it so that you have an id, so you can identify the coordinates
//also posible to add an id for the robot arm in case we have more than one
var Drawing = mongoose.Schema({
  coordinates: [],
  name: String
});

module.exports = mongoose.model('Drawing', Drawing);
