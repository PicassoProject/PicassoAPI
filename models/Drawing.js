var mongoose = require('mongoose');

//might be a teporary Schema cause I need to change the actual model according to our needs
var Drawing = mongoose.Schema({
  coordenates: [],
  name: String
});

module.exports = mongoose.model('Drawing', Drawing);
