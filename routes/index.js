var express = require('express');
var router = express.Router();

var storeDrawing = require('./storeDrawing');

/***********************************************
* Template de como hacer una nueva ruta        *
*router.get('/nombreruta', nombreFuncion);     *
*router.post('/nombreRuta', nombreFuncion);    *
* Este aplica cuando tiene tanto post y get    *
*router.use('/nombreRuta', nombreFuncion);     *
***********************************************/
router.post('/store', storeDrawing);
router.get('/test',function(req,res){
  res.send("this");
});

module.exports = router;
