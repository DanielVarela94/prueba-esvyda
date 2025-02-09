'use strict'
const {DataTypes} = require('sequelize');
const db_export = require("../config/db");

const movies_actors = db_export.db.define('movies_actors',{
    idmovies:{
        type: DataTypes.STRING
    },
    idactors:{
        type: DataTypes.STRING
    }
})

module.exports = movies_actors; 
