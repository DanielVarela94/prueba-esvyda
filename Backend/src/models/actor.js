'use strict'

const { DataTypes } = require("sequelize");
const db_export = require("../config/db");

const Actor = db_export.db.define('Actor', {
    name: {
        type: DataTypes.STRING
    }
})

module.exports = Actor; 