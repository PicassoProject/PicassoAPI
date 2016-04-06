var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = module.exports.app = exports.app = express();
var request = require('request');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/test", function (err) {
  if(err){
    console.log(err);
  } else {
    console.log('mongo connected');
  }
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes.initialize(app);
app.use('/', require('./routes'));

var home = [	'<html>',
		'<head><title>PicassoAPI</title></head>',
		'<body>',
		'<h1>API para nuestro brazo Picasso</h1>',
		'<br /><h3>Requests validos:</h3>',
		'<h4>/Pendiente</h4> Aqui agregare las rutas',
		'<h4>/Pendiente</h4> Redirige JSON hacia el robot con las cordenadas correctas',
		'</body></html>'].join('');

app.get('/', function(req, res){
  res.send(home);
});

app.get('*', function(req,res){
  res.send('404');
});


app.listen(process.env.PORT || 3000);
/*app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }*/

  console.log('Listening at http://localhost:3000');
});
