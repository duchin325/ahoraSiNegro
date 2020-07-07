'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Mi_perro_se_llama_clipper';

exports.ensureAuth = function(req,res,next){
  if(!req.headers.authorization){
    return res.status(403).send({ msj: 'La petición no tiene la cabecera de autenticación' });
  }

  var token = req.headers.authorization.replace(/['"]+/g, '');
  console.log(token);
  try {
    var payload = jwt.decode(token, secret);
    console.log(payload);
    if(payload.exp <= moment().unix()){
      return res.status(401).send({ msj: 'El token ha expirado'});
    }
  } catch (e) {
      res.status(404).send({ msj: 'El token no es valido'});
  }

  req.usuario = payload;
  next();
}
