var express = require('express');
var router = express.Router();

var storeDrawing = require('./storeDrawing');
//var listDrawings = require('./listDrawings');

/***********************************************
* Template for new routes                      *
*router.get('/routeName', functionName);       *
*router.post('/routeName', functionName);      *
* when you have both post and get              *
*router.use('/routeName', functionName);       *
***********************************************/
router.post('/store', storeDrawing);
router.get('/test',function(req,res){
  res.send("this");
});
//router.get('/list', listDrawings);

module.exports = router;
