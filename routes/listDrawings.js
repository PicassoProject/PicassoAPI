var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');

//this will be the post one, ill make a get as well just to make sure it works
var listDrawings = function(req,res){
  Drawing.find({}, function(err,draw){
    if(err){
      res.send(err);
    }
    else{
      res.send(draw);
    }
  });
  //TODO: test that this actually sends all the drawings in the database, this might send them as a list with coordinates, i want to get rid of the coordinates so that's another thing to take care of, but for now this will do
}

module.exports = listDrawings;
