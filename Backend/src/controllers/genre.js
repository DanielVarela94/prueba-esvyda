'use strict'
var Genre = require('../models/genre')

var controller = {
    getAllGenres: async (req, res) => {
        const genres = await Genre.findAll();
        return res.status(200).send({
            message: "Obtener todos los géneros",
            genres: genres
        });
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
        /* return res.status(200).send({
             message: "Guardar nuevo género",
             genre: genre
         });*/
    },

    getGenre: async (req, res) => {
        const id = req.params.id;
        const genre = await Genre.findByPk(id);

        if (genre) {
            return res.status(200).send({
                message: "Género encontrado",
                genre: genre
            });
        } else {
            return res.status(404).send({
                message: `No existe un género con id: ${id}`
            })
        }

    }
};

module.exports = controller;
