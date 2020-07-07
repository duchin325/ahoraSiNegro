'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensajeSchema = Schema({
  emisor: { type: Schema.ObjectId, ref: 'User'},
  receptor: { type: Schema.ObjectId, ref: 'User'},
  text: String,
  created_at: String
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
