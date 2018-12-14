var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();

var db = require('../models/usuario'); 

//=======================================
// Obtener todos los usuarios
//========================================
app.get('/', (req, res, next)=>{
    //obtenemos todos los usuarios pero le excluimos la contraseña
    db.Usuario.findAll({
        attributes:{
            exclude: ['password']
        } 
    }).then(usu =>{

        res.status(200).json({
            result:true,
            usuarios:usu
        })

    }).catch(err=>{
        return res.status(500).json({
            result:false,
            message: 'Error al obtener los usuarios',
            errors:err
        })
    })


})
//=======================================
// Crear nuevo usuario
//========================================
app.post('/', (req, res)=>{

   var body = req.body;

   //valida si enviaron la contraseña, de ser asi se encripta con un cifrado de 1 via
   if(body.password){
       body.password = bcrypt.hashSync(body.password, 10);
   }

   db.Usuario.create(body).then((usu)=>{
        res.status(200).json({
            result:true,
            usuario:usu
        })
   }).catch(err=>{
    return res.status(400).json({
        result:false,
        message: 'Error al registrar el usuario',
        errors:err
    })
   })
   
})

//=======================================
// Actualizar usuario
//========================================

app.put('/actualizar/:cod', (req, res)=>{

    var cod = req.params.cod;
    var body = req.body;

    db.Usuario.findByPk(cod).then((user)=>{

        if(user === null){   
            res.status(400).json({
                result:false,
                message:"El usuario con el codigo "+cod+ " no existe",
                errors:{message:"No existe el usuario registrado con ese Codigo"}
            })
        }

        if(body.password){
            body.password = bcrypt.hashSync(body.password, 10);
        }
        
        db.Usuario.update(body,{where:{id_usuario:cod}}).then((usuaUpdate)=>{
            res.status(200).json({
                result:true,
                usuario:usuaUpdate,
                message: "Usuario actualizado correctamente"
            })
        }).catch(err=>{
            res.status(400).json({
                result:false,
                message:"Error al actualizar el usuario",
                errors:err
            })   
        })
  

    }).catch(err=>{
        res.status(500).json({
            result:false,
            message:"Error al buscar el usuario con el codigo "+cod,
            errors:err
        })        
    })


    
   
    
 })

module.exports = app;