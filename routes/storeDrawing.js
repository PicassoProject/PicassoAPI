var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');
var convert = require('../helpers/conversionAlgo');

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
  console.log("PAY ATTENTION HERE");
  console.log(drawing.coord[0].x);
  var drawingAngle = [];

  Drawing.findOne({name: drawing.name}, function(err,draw){

    for(var i = 0; i < drawing.coord.length; i = i + 1){
      //look I KNOW THIS WILL LOOK AWFUL BUT I HAVE NO CHOICE
      px = drawing.coord[i].x
      py = drawing.coord[i].y;
      //tan1
      var l1 = 101.6;
      var l2 = 177.8;
      var l3 = 127;
      //for tetha1
      var firstTan;
      var SecondTan;
      var tetha1;
      //for tetha2
      var preTethaUp;
      var preTethaDown;
      var preUp1;
      var preUp2;
      var preUp3;
      var preTetha2;
      var tetha2;
      //for tetha3
      var upperCos1;
      var upperCos2;
      var upperCos3;
      var upperCos;
      var lowerCos;
      var totalCos;
      var tetha3;
      firstTan = math.atan2(py,px);
      temp2 = (math.sqrt((px*px)+(py*py)-(l1*l1)));
      if(y < 0){
        temp2 = temp2 * -1;
      }
      SecondTan = math.atan2(l1,temp2);
      tetha1 = firstTan - SecondTan;
      tetha1x2 = tetha1 * 2;

      upperCos1 = (px * px) * ((1 / 2) + ((1 / 2) * math.cos(tetha1x2)));
      upperCos2 = 2 * px * py * math.cos(tetha1) * math.sin(tetha1);
      upperCos3 = (py * py) * ((1 / 2) - ((1 / 2) * math.cos(tetha1x2)));
      upperCos = upperCos1 + upperCos2 + upperCos3 + (pz * pz) - (l3 * l3) - (l2 * l2);
      lowerCos = 2 * l2 * l3;
      totalCos = upperCos / lowerCos;
      tetha3 = math.acos(totalCos);

      preUp1 = l2 * ((px * math.cos(tetha1)) + (py * math.sin(tetha1)));
      preUp2 = (px * math.cos(tetha1) * math.cos(tetha3));
      preUp3 = (py * math.sin(tetha1) * math.cos(tetha3))
      preUp4 = (pz * math.sin(tetha3));
      preUp5 = l3 * (preUp2 + preUp3 - preUp4);
      preTethaUp = preUp1 + preUp5;
      preTethaDown = ((px * math.cos(tetha1)) + (py * math.sin(tetha1)) * (px * math.cos(tetha1)) + (py * math.sin(tetha1))) + (pz * pz);
      preTetha2 = preTethaUp / preTethaDown;
      tetha2 = math.acos(preTetha2);

      var angleN = {
        angle1: tetha1,
        angle2: tetha2,
        angle3: tetha3
      }
      drawingAngle[i] = angleN;
    }
    if(!draw){
      console.log("new drawing");
      var draw2 = new Drawing({coordinates: drawing.coord, name: drawing.name, angles: drawingAngle});
      draw2.save(function(err,d){
        if(err){console.log(err);}
      });

      requestObject = {
        //this url is the url for the edison route
        url: "https://infinite-brushlands-67485.herokuapp.com/test",
        form: {
          angle: drawingAngle
        }
      }
      request.post(requestObject, function(err,response,body) {
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
      });
    }
    res.json({
      "status": "name already exists",
      "name": "noName"
    });
  });
}

module.exports = storeDrawing;
