var express = require('express');
var router = express.Router();

var storeDrawing = require('./storeDrawing');
var listDrawings = require('./listDrawings');
var drawStored = require('./drawStored');

/***********************************************
* Template for new routes                      *
*router.get('/routeName', functionName);       *
*router.post('/routeName', functionName);      *
* when you have both post and get              *
*router.use('/routeName', functionName);       *
***********************************************/
router.post('/store', storeDrawing);
router.get('/test',function(req,res){
  console.log(req.body);
  res.send(200);
});
router.post('/test',function(req,res){
  console.log(req.body);
  res.send(200);
})
router.get('/list', listDrawings);
router.post('drawStored', drawStored);

module.exports = router;
