var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');
var Status = require('../models/Status');

var storeDrawing = require('./storeDrawing');
var listDrawings = require('./listDrawings');
var drawStored = require('./drawStored');
var print = require('./drawingtoprint');
var same = require('./same');

/***********************************************
* Template for new routes                      *
*router.get('/routeName', functionName);       *
*router.post('/routeName', functionName);      *
* when you have both post and get              *
*router.use('/routeName', functionName);       *
***********************************************/
router.post('/store', storeDrawing);
router.get('/same', same);
router.get('/drawingtoprint', print);
router.get('/list', listDrawings);
router.post('/drawStored', drawStored);
router.get('/deleteAll', function(req,res){
  Drawing.find({}).remove().exec();
  res.send("it worked");
});
router.get('/createStatus', function(req,res){
  var status = new Status({name: 'active', toDraw: 0});
  status.save(function(err, stat){
    if(err){
      console.log(err);
    }
    else{
      res.sendStatus(200);
    }
  });
});

module.exports = router;
