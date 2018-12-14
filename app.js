//Inicializa todo el  backend server

//Requires: Librerias necesarias
var express = require('express');
var mysql = require('sequelize');
var bodyParser = require('body-parser');


//Inicializar variables:Usamos las librerias
var app = express();


//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Conexion a la base de datos
// ('database','user', 'password')
var db = new mysql('guardcrm', 'root', null, {
    host:'localhost',
    dialect: 'mysql'
})

db.authenticate().then(()=>{
    console.log('Base de datos: \x1b[32m%s\x1b[0m','online');
    
}).catch(err=>{
    console.log("Error de conexion base de datos", err);
    
})



//Importar rutas
var appRoutes = require('./routes/app_routes');
var usuarioRoutes = require('./routes/usuario_routes');


//Rutas
app.use('/usuario',usuarioRoutes);
app.use('/',appRoutes);


//Escuchar peticiones

app.listen(3000,()=>{
    console.log('Servidor Express puerto 3000: \x1b[32m%s\x1b[0m', 'online');    
})