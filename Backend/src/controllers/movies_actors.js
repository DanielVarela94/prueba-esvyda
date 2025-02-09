'use strict'
var MovieActor = require('../models/movies_actors')

var controller = {
    getAllMoviesActors: async (req, res) => {
        const movies_actors = await MovieActor.findAll();
        if (movies_actors.length > 0 ) {
            return res.status(200).send({
                message: "Se ha encontrado una o más relaciones.",
                movies_actors: movies_actors
            });
        } else {
            return res.status(404).send({
                message: "No se ha encontrado ninguna relación."
            });
        }
    },

    saveNewMovieActor: async (req, res) => {
        const movie_actor = new MovieActor();
        try {
            movie_actor.idmovies = req.body.idmovie;
            movie_actor.idactors = req.body.idactor;
            await movie_actor.save();
            return res.status(200).send({
                message: "La relación se ha guardado con éxito",
                movie_actor: movie_actor
            });
        } catch (error) {
            console.log(`Error al guardar la relación: ${error}`);
            return res.status(500).send({
                message: "Error al guardar el actor."
            });
        }
    },

    getMovieActor: async (req, res) => {
        const id = req.params.id;
        const movie_actor = await MovieActor.findByPk(id);
        if (movie_actor) {
            return res.status(200).send({
                message: "Relación encontrada",
                movie_actor: movie_actor
            });
        } else {
            return res.status(404).send({
                message: `No existe una relación: ${id}`
            })
        }
    }
};

module.exports = controller;
