var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');

//this will be the post one, ill make a get as well just to make sure it works
/*******************************************************************************
* this will receive a drawing with an unique name
* the drawing will contain a name and a set of coordinates
* this will check if the name already exists, if it does it will do nothing
* if it doesn't exist it will save it on the database and post to the controler
*******************************************************************************/
var storeDrawing = function(req,res){
  var drawing = {};
  drawing.name = req.body.name;
  drawing.coord = req.body.coord;
  console.log("name:");
  console.log(req.body.name);
  //console.log("cordinates:");
  //console.log(req.body.coord);

  Drawing.findOne({name: drawing.name}, function(err,draw){
    //console.log("dbresponse");
    if(!draw){
      console.log("new drawing");
      var draw2 = new Drawing({coordinates: drawing.coord, name: drawing.name});
      draw2.save(function(err,d){
        if(err){console.log(err);}
      });
      //TODO: fill the url with the edison url and route for the post
      //TODO: test that this actually does send the drawing to the controler properly
      /*requestObject = {
        //this url is the url for the edison route
        url: "https://infinite-brushlands-67485.herokuapp.com/test",
        form: {
          coordinates: req.body.coord,
        }
      }*/
      /*request.post(requestObject, function(err,response,body) {
        if(err) {
          console.log(err);
          res.status(404);
          res.send('404 error');
          return;
        }
        else{
          res.json({
            "status": "successfully saved",
            "name": drawing.name
          });
        }
      });*/

      res.json({
        "status": "successfully saved",
        "name": drawing.name
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
