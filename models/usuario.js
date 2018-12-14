var Sequelize = require('sequelize');
var sequelize = require('../config/config_db');

var db ={};

db.Usuario = sequelize.define("Usuario", {
    id_usuario: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
    },
    nom_usuario: {
        type: Sequelize.STRING 
    },
    password: { 
        type: Sequelize.STRING,
        validate:{
            len:{
                args:8,
                msg: "La contraseña debe tener minimo 8 caracteres entre Mayusculas, minusculas y caracteres especiales (*,.$/#)"
            }
        }
    },
    email_usuario: { 
        type: Sequelize.STRING, 
        allowNull:false,
        validate:{ 
            isEmail: {
                args:true,
                msg:"Este no es un correo valido, verifique y vuelva a intentar."
            }
        }
    },
    id_zona: { 
        type:Sequelize.INTEGER, 
        allowNull:false 
    },
    id_rol:{ 
        type:Sequelize.INTEGER, 
        validate:{ isInt: true},
        allowNull:false 
    },
    sector_usuario:{ 
        type: Sequelize.STRING,
        validate:{
            isIn:{
                args:[['PERIFERIA', 'FLORES']],
                msg: "El sector debe ser PERIFERIA o FLORES"
            }
        } 

    },
    jefe_usuario:{ 
        type: Sequelize.STRING 
    },
    sesion_usuario:{ 
        type: Sequelize.STRING 
    },
    estado_usuario: { 
        type: Sequelize.STRING ,
        validate:{
            isIn:{
                args:[['ACTIVO', 'INACTIVO']],
                msg: "Solamente puede indicar si el usuario esta ACTIVO o INACTIVO"

            }
        },
    }
  },
  {
      tableName:'usuario',
      timestamps:false,
      paranoid:true
  });

  module.exports = db;