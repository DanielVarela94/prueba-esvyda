'use strict'
var Genre = require('../models/genre');
var Movie = require('../models/movie');
var Actor = require('../models/actor')

var controller = {
    getAllGenres: async (req, res) => {
        const genres = await Genre.findAll();
        if(genres){
            return res.status(200).send({
                message: "Se ha encontrado uno o más géneros.",
                genres: genres
            });
        }else{
            return res.status(404).send({
                message: "No se ha encontrado ningún género"
            })
        }
    },

    saveNewGenre: async (req, res) => {
        const genre = new Genre();
        try {
            genre.name = req.body.name;
            await genre.save();
            return res.status(200).send({
                message: "El género se ha guardado con éxito",
                genre: genre.name
            });
        } catch (error) {
            console.log(`Error al guardar el género: ${error}`);
            return res.status(500).send({
                message: "Error al guardar el género."
            });
        }
    },

    getMoviesGenre: async (req, res) => {
        const id = req.params.id;
        const movies = await Movie.findAll({
            where: {genre: id},
            include: [{ model: Actor, through: { attributes: [] } }, {model: Genre}]
        });
        if (movies) {
            console.log(movies);
            return res.status(200).send({
                message: "Películas encontradas para el género buscado.",
                movie: movies
            });
        } else {
            return res.status(404).send({
                message: `No existe un género con id: ${id}`
            })
        }
    }
};

module.exports = controller;
