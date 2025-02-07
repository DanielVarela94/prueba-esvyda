var Movie = require('../models/movie');

var controller = {
    getAllMovies: async (req, res) => {
        const movies = await Movie.findAll();
        return res.status(200).send({
            message: "Obtener todas las películas",
            movies: movies
        });
    },

    saveMovie: async (req, res) => {
        return res.status(200).send({
            message: "Guardar película"
        });
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
                movie
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
                message: `Películas que pertenecen al género ${genre}`,
                movies: movies
            })
        } else {
            return res.status(404).send({
                message: `No existen películas para el género ${genre}`
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
                message: `Películas que se lanzaron el ${date}`,
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
        if(movie){
            await movie.destroy();
            return res.status(200).send({
                message: `La película ${movie} ha sido eliminada`
            });
        } else{
            return res.status(404).send({
                message: `La película con id: ${id} no ha sido encontrada.`
            });
        }
    },

    saveMovie: async (req, res) => {
        const name = req.params.name;
        const image = req.body.image;
        const synopsis = req.body.synopsis;
        const date = req.body.date;
        const genre = req.body.genre;
        const studio = req.body.studio;
        const age = req.body.age;
        const qualification = req.body.qualification;
        const duration = req.body.duration;

        return res.status(200).send({
            message: "estoy guardando una película"
        });
    }

   /* getMoviesByActor: async (req, res) => {
        const actor = req.params.actor;
        const movies = await Movie.findAll({
            where: {
                actor: actor
            }
        });
        if (movies) {
            return res.status(200).send({
                message: `Películas en las que actua ${genre}`,
                movies: movies
            })
        } else {
            return res.status(404).send({
                message: `No existen películas en las que actua ${genre}`
            })
        }
    }*/
};

module.exports = controller;