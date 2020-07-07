'use strict'

var mongoose = require('mongoose');
var Shema = mongoose.Schema;

var PubliSchema = Schema({
  user: {type: Schema.ObjectId, ref: 'User'},
  text: String,
  file: String,
  created_ar: String
});

module.exports = mongoose.model('Publicacion', PubliSchema);
