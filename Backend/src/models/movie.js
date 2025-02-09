'use strict'

const { DataTypes } = require("sequelize");
const db_export = require("../config/db");

const Movie = db_export.db.define('Movie', {
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    synopsis: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.STRING
    },
    genre: {
        type: DataTypes.INTEGER
    },
    studio: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    qualification: {
        type: DataTypes.INTEGER
    },
    duration: {
        type: DataTypes.INTEGER
    }
});


module.exports = Movie;