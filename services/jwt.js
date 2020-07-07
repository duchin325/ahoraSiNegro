'use strict'

var secret = 'Mi_perro_se_llama_clipper';

var jwt = require('jwt-simple');
var moment = require('moment');

exports.createToken = function(usuario){
  var payload = {
    sub: usuario._id,
    name: usuario.name,
    surname: usuario.surname,
    nick: usuario.nick,
    email: usuario.email,
    role: usuario.role,
    image: usuario.image,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix
  };
  return jwt.encode(payload, secret);
};
