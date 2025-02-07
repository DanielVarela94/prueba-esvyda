const multer = require('multer');
const Movie = require('../models/movie');
const fs = require('node:fs');
const path = require('path');

const controller = {
    getAllMovies: async (req, res) => {
        const movies = await Movie.findAll();
        if (movies.length > 0) {
            return res.status(200).send({
                message: "Se ha encontrado una o más películas.",
                movies: movies
            });
        } else {
            return res.status(404).send({
                message: "No se ha encontrado ninguna película."
            });
        }
    },

    updateMovie: async (req, res) => {
        return res.status(200).send({
            message: "Actualizar película"
        });
    },

    getMovieById: async (req, res) => {
        const id = req.params.id;
        const movie = await Movie.findByPk(id);
        if (movie) {
            return res.status(200).send({
                message: "Búsqueda de película exitosa",
                movie: movie
            });
        } else {
            return res.status(404).send({
                message: `La película con Id: ${id} no existe.`
            })
        }
    },

    getMoviesByGenre: async (req, res) => {
        const genre = req.params.genre;
        const movies = await Movie.findAll({
            where: {
                genre: genre
            }
        });
        if (movies.length > 0) {
            return res.status(200).send({
                message: `Se han encontrado una o más películas que pertenecen al género ${genre}`,
                movies: movies
            })
        } else {
            return res.status(404).send({
                message: `No existen películas del género ${genre}`
            })
        }
    },

    getMoviesByDate: async (req, res) => {
        const date = req.params.date;
        const movies = await Movie.findAll({
            where: {
                createdAt: date
            }
        });
        if (movies.length > 0) {
            return res.status(200).send({
                message: `Se ha encontrado una o más películas que se lanzaron el ${date}`,
                movies: movies
            })
        } else {
            return res.status(404).send({
                message: `No existen películas lanzadas el ${date}`
            })
        }
    },

    deleteMovie: async (req, res) => {
        const id = req.params.id;
        const movie = await Movie.findByPk(id);
        if (movie) {
            fs.unlinkSync(movie.image);
            await movie.destroy();
            return res.status(200).send({
                message: `La película ha sido eliminada`
            });
        } else {
            return res.status(404).send({
                message: `La película con id: ${id} no ha sido encontrada.`
            });
        }
    },

    saveMovie: async (req, res) => {
        const movie = new Movie();
        try {
            movie.name = req.body.name;
            movie.image = saveImage(req.file, movie.name);
            console.log(movie.image);
            movie.synopsis = req.body.synopsis;
            movie.date = date = req.body.date;
            movie.genre = req.body.genre;
            movie.studio = req.body.studio;
            movie.age = req.body.age;
            movie.qualification = req.body.qualification;
            movie.duration = req.body.duration;
            await movie.save();
            return res.status(200).send({
                message: `La película ${movie.name} ha sido guardada exitosamente`
            });
        }
        catch (error) {
            console.log(`Error al guardar la película. ${error}`);
            return res.status(500).send({
                message: "Error al guardar la película."
            });
        }
    },
    updateMovie: async (req, res) => {
        const id = req.params.id;
        const data_update = req.body;
        try {
            const movie = await Movie.findByPk(id);
            if (movie) {
                fs.unlinkSync(movie.image);
                Object.assign(movie, data_update);
                movie.image = saveImage(req.file, movie.name);
                await movie.save();
                return res.status(200).send({
                    message: "Película actualizada exitosamente.",
                    movie: movie
                });
            } else {
                return res.status(404).send({
                    message: "La película no ha sido encontrada."
                });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Ha ocurrido un error al actualizar la película."
            });
        }
    }
};

function saveImage(file, name) {
    const format = "." + (file.originalname.split(".", 2))[1];
    const new_path = path.join(__dirname, `../public/files/${name}${format}`);
    fs.renameSync(file.path, new_path);
    return new_path;
}

module.exports = controller;