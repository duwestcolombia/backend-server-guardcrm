var Sequelize = require('sequelize');

var sequelize = new Sequelize('guardcrm', 'root', null, {
    host:'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;