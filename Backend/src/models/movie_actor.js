'use strict'
const {DataTypes} = require('sequelize');
const db_export = require("../config/db");

const Movie_actor = db_export.db.define('Movie_actor',{
    name:{
        type: DataTypes.STRING
    }
})

module.exports = Genre; 
