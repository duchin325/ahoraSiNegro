'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');



function home(req,res){
  res.status(200).send({ msj: 'Hola mundo'});
}

// Guardar un usuario
function guardarUsuario(req,res){
  var params = req.body;
  var usuario = new User();

  if(params.name && params.nick && params.surname && params.email && params.password){

      usuario.name = params.name;
      usuario.surname = params.surname;
      usuario.nick = params.nick;
      usuario.email = params.email;
      usuario.role = 'ROLE_USER';
      usuario.image = null;

   // Control de usuarios duplicados

   User.find({ $or: [
     {email: usuario.email.toLowerCase()},
     {nick: usuario.nick.toLowerCase()}
   ]}).exec((err, users) => {
     if(err) return res.status(500).send({msj:'Error en la petición de usuarios'});

     if(users && users.length >= 1){
       return res.status(200).send({ msj: 'El usuario que intentas registrar ya existe!'})
     }else {
       // Encripta la pass y me guarda los datos
           bcrypt.hash(params.password, null, null, (err, hash) => {
             usuario.password = hash;

             usuario.save((err, usuarioGuardado) => {
               if(err) return res.status(500).send({ msj: 'Error al guardar el usuario' });

               if(usuarioGuardado){
                   res.status(200).send({usuario: usuarioGuardado});
               }else{
                   res.status(404).send({ msj: 'No se ha registrado el usuario' });
               }
             });
           });
     }
   });

  }else{
        res.status(200).send({
        msj: 'Envia todos los datos necesarios'
      });
    }
}



// login de usuario
function loginUsuario(req,res){
  var params = req.body;

  var email = params.email;
  var password = params.password;

  User.findOne({ email: email}, (err, usuario) => {
    if(err) return res.status(500).send({ msj: 'Error en la petición'});

      if(usuario){
        bcrypt.compare(password, usuario.password, (err, check) => {
          if(check){
            //Generar y devolver token
            if(params.gettoken){
              res.status(200).send({
                token: jwt.createToken(usuario)
              });
            }else {
              //Devolver datos del usuario
              usuario.password = undefined;
              res.status(200).send(usuario);
            }

          }else{
            return res.status(404).send({ msj: 'Error no se ha identificado coños !'});
          }
        });
      }else{
          return res.status(404).send({ msj: 'El usuario no se ha identificado'});
        }
  });
}

module.exports = {
  guardarUsuario,
  home,
  loginUsuario
}
