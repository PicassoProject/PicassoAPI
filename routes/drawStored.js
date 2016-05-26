var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');

var drawStored = function(req,res){
  var drawing = {};
  drawing.name = req.body.name;
  //drawing.coord = req.body.coord;
  console.log("HEY HERE PAY ATTENTION");
  console.log(drawing.name);
  console.log(drawing.coord);
  Drawing.findOne({name: drawing.name}, function(err,draw){
    console.log("dbresponse");
    if(draw){
      console.log("drawing exists");
      //TODO: fill the url with the edison url and route for the post
      //TODO: test that this actually does send the drawing to the controler properly
      //var x = 0;
      //var y = 0;
      //var dummycoord = [{x,y}];
      //var actualCoord = draw.coord || dummycoord;
      requestObject = {
        //this url is the url for the edison route
        url: "https://infinite-brushlands-67485.herokuapp.com/test",
        form: {
          coord: draw.coord,
        }
      }
      request.post(requestObject, function(err,response,body) {
        if(err || response.statusCode == 404) {
          res.status(404);
          res.send('404 error');
          return;
        }
        console.log("did i send?");
      });

      res.json({
        "status": "successfully sent",
        "name": draw.name
      });
    }
    else{
      console.log("really what happened was that the drawing didn't exist")
      res.send(404);
    }
  });
}
module.exports = drawStored;
