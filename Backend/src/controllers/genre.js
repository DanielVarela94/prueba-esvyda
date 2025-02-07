'use strict'
var Genre = require('../models/genre')

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
