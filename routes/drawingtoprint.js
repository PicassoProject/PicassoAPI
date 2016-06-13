var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');
var Status = require('../models/Status');
var convert = require('../helpers/conversionAlgo');
var Promise = require('promise');

var drawingtoprint = function(req,res){
  Status.findOne({name: 'active'}, function(err,stat){
    if(err){
      console.log(err);
      res.sendStatus(404);
    }
    else{
      if(stat.toDraw === 0){
        res.send(404);
      }
      else{
        stat.toDraw = 0;
        stat.save(function(error){
          if(error){
            console.log(error);
          }
        });
        res.send(stat.angles);
      }
    }
  });
}

module.exports = drawingtoprint;
