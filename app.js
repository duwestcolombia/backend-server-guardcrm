//Inicializa todo el  backend server

//Requires: Librerias necesarias
var express = require('express');
var mysql = require('sequelize');


//Inicializar variables:Usamos las librerias
var app = express();


//Conexion a la base de datos
// ('database','user', 'password')
var db = new mysql('controltime', 'root', null, {
    dialect: 'mysql'
})

db.authenticate().then(()=>{
    console.log('Base de datos: \x1b[32m%s\x1b[0m','online');
    
}).catch(err=>{
    console.log("Error de conexion base de datos", err);
    
})


//Rutas
app.get('/', (req, res, next)=>{

    res.status(200).json({
        response:true,
        message: 'Peticion realizada correctamente'
    })

})


//Escuchar peticiones

app.listen(3000,()=>{
    console.log('Servidor Express puerto 3000: \x1b[32m%s\x1b[0m', 'online');    
})