var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');

//this will be the post one, ill make a get as well just to make sure it works
var storeDrawing = function(req,res){
  var drawing = {};
  drawing.name = req.body.name;
  drawing.coord = req.body.coord;
  console.log("name:");
  console.log(req.body.name);
  console.log("cordinates:");
  console.log(req.body.coord);

  Drawing.findOne({name: drawing.name}, function(err,draw){
    console.log("dbresponse");
    if(!draw){
      console.log("new drawing");
      var draw2 = new Drawing({coordinates: drawing.coord, name: drawing.name});
      draw2.save(function(err,d){
        if(err){
          console.log(err);
        }
        else {
          res.json({
            "status": "successfully saved",
            "name": drawing.name
          });
        }
      });
    }
    else {
      res.json({
        "status": "name already exists",
        "name": "noName"
      });
    }
  });
}

module.exports = storeDrawing;
