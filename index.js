'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

// Conexión a la base de datos
 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost:27017/curso_mean_social', {useMongoClient: true})
         .then(()=>{
           console.log('La conexión a la base de datos se ha realizado con éxito');

           // Creación del servidor
           app.listen(port, () => {
             console.log('Servidor corriendo...');
           });
         })
         .catch(err => console.log(err));
