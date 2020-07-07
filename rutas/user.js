'use strict'

var express = require('express');
var UsuarioControlador = require('../controladores/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/home', md_auth.ensureAuth, UsuarioControlador.home);
api.post('/registro', UsuarioControlador.guardarUsuario);
api.post('/login', UsuarioControlador.loginUsuario);

module.exports = api;
