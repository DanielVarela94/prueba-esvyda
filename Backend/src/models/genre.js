'use strict'
const { DataTypes } = require("sequelize");
const db_export = require("../config/db");

const Genre = db_export.db.define('Genre',{
    name:{
        type: DataTypes.STRING
    }
})

module.exports = Genre; 