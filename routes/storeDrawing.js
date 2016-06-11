var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');
var convert = require('../helpers/conversionAlgo');
var Promise = require('promise');
var math = require('mathjs');

//this will be the post one, ill make a get as well just to make sure it works
/*******************************************************************************
* this will receive a drawing with an unique name
* the drawing will contain a name and a set of coordinates
* this will check if the name already exists, if it does it will do nothing
* if it doesn't exist it will save it on the database and post to the controler
*******************************************************************************/

var storeDrawing = function(req,res){
  var drawing = {};
  var angles = [];
  drawing.name = req.body.name;
  drawing.coord = req.body.coord;
  console.log("PAY ATTENTION HERE");
  //var drawingAngle = [];
  var transform = new Promise(function(fulfill,reject){
    console.log("did i get here");
    Drawing.findOne({name: drawing.name}, function(err,draw){
      var drawingAngle = [];
      if(!draw){
        console.log("new drawing");
        var draw2 = new Drawing({coord: drawing.coord, name: drawing.name});
        draw2.save(function(err,d){
          if(err){console.log(err);}
        });
        console.log("im fullfilling my promise");
        fulfill(drawing);
      }
      else{
        reject(res.error);
      }

    });
  });
  transform.then(function(value){
    res.send("successfully saved");
    var co = [];
    var co = value.coord;
    console.log("i continued with my promise");
    var transform2 = new Promise(function(fulfill,reject){
      console.log(co.length);
      for(var i = 0; i < co.length; i++)
      {
        //console.log(i);
        var px = co[i].x;
        var py = co[i].y;
        var pz = 0;
        var l1 = 44.45;
        var l2 = 165.1;
        var l3 = 152.4;
        var q1Value = py/px // if atan(py/px) >= 90 use + on the sqrt or use -
        var q1Value2 = (44.45)/sqrt((px*px) + (py*py) - (l1*l1))
        console.log(q1Value2);
        var Q1 = Math.atan(q1Value) - Math.atan(q1Value2);
        q3Value2 = ((2*l2*l3)/(px*px+py*py+pz*pz-l1*l1-l2*l2*l3*l3))*((2*l2*l3)/(px*px+py*py+pz*pz-l1*l1-l2*l2*l3*l3)) - 1;
        q3Value = Math.sqrt(q3Value2) //this should be positive or negative depending on something, idk what yet
        var Q3 = Math.atan(q3Value);
        var q2Value = ((-pz*(l2+l3*Math.cos(Q3)) - (l3*Math.sin(Q3)*(py*Math.sin(Q1) + px*Math.cos(Q1))))/((px*Math.cos(Q1)+py*Math.sin(Q1)) * (l3*Math.cos(Q3)+l2) - (pz*l3*Math.sin(Q3))));
        var Q2 = Math.atan(q2Value);
        angles[i].angle1 = Q1;
        angles[i].angle2 = Q2;
        angles[i].angle3 = Q3;
        console.log("fml")
      }
      console.log("i finished calculating");
      fulfill(angles);
    });

    transform2.then(function(value){
      requestObject = {
      //this url is the url for the edison route
        url: "10.4.41.219:3000",
        form: {
          draw: value
        }
      }
      console.log(angles);
      console.log("second promise");
      request.post(requestObject, function(err,response,body) {
        if(err) {
          console.log(err);
          return;
        }
        else{
          console.log("successfully transformed");
        }
    });


    /*
    request.post(requestObject, function(err,response,body) {
      if(err) {
        console.log(err);
        res.status(404);
        res.send('404 error');
        return;
      }
      else{
        res.send("successfully saved");
      }
    });*/
    //res.send("successfully saved");
  });
}

module.exports = storeDrawing;
