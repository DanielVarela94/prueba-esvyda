'use strict'

const { DataTypes } = require("sequelize");
const db_export = require("../config/db");

const Actor = db_export.db.define('Actor', {
    actor: {
        type: DataTypes.STRING
    }
})

module.exports = Actor; 