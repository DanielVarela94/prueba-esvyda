'use strict'
const { DataTypes } = require('sequelize');
const db_export = require("../config/db");
const Movie = require('../models/movie');
const Actor = require('../models/actor');

const movies_actors = db_export.db.define('movies_actors', {
    idmovies: {
        type: DataTypes.STRING
    },
    idactors: {
        type: DataTypes.STRING
    }
})

Movie.belongsToMany(Actor, { through: movies_actors, foreignKey: 'idmovies' });
Actor.belongsToMany(Movie, { through: movies_actors, foreignKey: 'idactors' });

module.exports = movies_actors; 
