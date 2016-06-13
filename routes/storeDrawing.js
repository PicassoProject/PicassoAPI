var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');
var Status = require('../models/Status');
var convert = require('../helpers/conversionAlgo');
var Promise = require('promise');
var face = require('fb');
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
  var transform = new Promise(function(fulfill,reject){
    console.log("entering the first part of the promise");
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
  //first promise fullfilled
  transform.then(function(value){
    //starting second promise
    var transform2 = new Promise(function(fulfill,reject){
      console.log("this is the second promise");
      var i = 0;
      var loop = setInterval(function(){
        if(i < drawing.coord.length){
          var angleObject = {}
          var px = 0;
          var py = 0;
          var pz = 0;
          var l1 = 44.45;
          var l2 = 165.1;
          var l3 = 152.4;
          var Q1 = 0;
          var q1Value = 0;
          var q1Value2 = 0;
          var Q3 = 0;
          var q3Value2 = 0;
          var q3Value = 0;
          var Q2 = 0;
          var q2Value = 0;
          px = drawing.coord[i].x / 10;
          py = drawing.coord[i].y / 10;
          console.log("value of px" + px.toString());
          console.log("value of py" + py.toString());
          q1Value = py/px // if atan(py/px) >= 90 use + on the sqrt or use -
          q1Value2 = (44.45)/Math.sqrt((px*px) + (py*py) - (l1*l1));
          Q1 = Math.atan(q1Value) - Math.atan(q1Value2);
          q3Value3 = (2*l2*l3)/(px*px+py*py+pz*pz-l1*l1-l2*l2*l3*l3);
          q3Value3 = Math.pow(q3Value3,2);
          q3Value2 = q3Value3 -  1;
          console.log("value before before Q3: " + q3Value2.toString());
          //console.log("value before before q3: " + q3Value2.toString());
          q3Value = Math.sqrt(q3Value2); //this should be positive or negative depending on something, idk what yet
          Q3 = Math.atan(q3Value);
          if(!Q3){
            q3Value = q3Value * -1;
            Q3 = Math.atan(q3Value);
          }
          q2Value = ((-pz*(l2+l3*Math.cos(Q3)) - (l3*Math.sin(Q3)*(py*Math.sin(Q1) + px*Math.cos(Q1))))/((px*Math.cos(Q1)+py*Math.sin(Q1)) * (l3*Math.cos(Q3)+l2) - (pz*l3*Math.sin(Q3))));
          Q2 = Math.atan(q2Value);
          angleObject.angle1 = Q1;
          angleObject.angle2 = Q2;
          angleObject.angle3 = Q3;
          angles[i] = angleObject;
          i = i + 1;
        }
        else{
          fulfill(angles);
          clearInterval(loop);
        }
      },2000);//3000 works fine, trying 2000
    });
    //second promise fullfilled
    transform2.then(function(val){
      Status.findOne({name: 'active'}, function(err, stat){
        if(err){
          console.log(err);
          return err;
        }
        stat.toDraw = 1;
        stat.lastName = drawing.name;
        stat.angles = val;
        stat.save(function(error){
          if(error){
            console.log(error);
            return error;
          }
          else{
            res.sendStatus(200);
          }
        });
      });
    });
  });
}
module.exports = storeDrawing;
