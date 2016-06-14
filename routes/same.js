var request = require('request');
var mongoose = require('mongoose');
var Drawing = require('../models/Drawing');
var Status = require('../models/Status');
var same = function(req,res){
  Status.findOne({name: 'active'}, function(err,stat){
    if(err){
      console.log(err);
      res.sendStatus(404);
    }
    else{
      res.send(stat.angles);
    }
  });
}
module.exports = same;
