'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var usuario_rutas = require('./rutas/user');
// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// cors

// rutas
app.use('/api', usuario_rutas);
// exportar
module.exports = app;
