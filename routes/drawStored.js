var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');

var drawStored = function(req,res){
    var name = req.body.name;
    Drawing.findOne({name: name}, function(err,draw){
      console.log("dbresponse");
      if(draw){
        console.log("drawing exists");
        //TODO: fill the url with the edison url and route for the post
        //TODO: test that this actually does send the drawing to the controler properly
        requestObject = {
          //this url is the url for the edison route
          url: "https://infinite-brushlands-67485.herokuapp.com/test",
          form: {
            coordinates: req.body.coord,
          }
        }
        request.post(requestObject, function(err,response,body) {
          if(err || response.statusCode == 404) {
            res.status(404);
            res.send('404 error');
            return;
          }
        });
        res.json({
          "status": "successfully sent",
          "name": drawing.name
        });
      }
      else{
        console.log("really what happened was that the drawing didn't exist")
        res.send(404);
      }
    });
}
module.exports = drawStored;