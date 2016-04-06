var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');

//this will be the post one, ill make a get as well just to make sure it works
var storeDrawing = function(req,res){
  var drawing = {};
  var cords = {};
  cords = req.body.coordinates;
  drawing.coordinates = cords;
  drawing.name = req.body.name;
  console.log(drawing.coordinates);
  console.log("please tell me it works");
  console.log(cords);
  //change this so that instead of returning this json it saves it on the database
  res.json({
    "status": "it worked",
    "name": drawing.name,
    "coordinates": drawing.coordinates
  });
}

module.exports = storeDrawing;
