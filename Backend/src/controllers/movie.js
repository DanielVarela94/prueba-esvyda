const multer = require('multer');
const Movie = require('../models/movie');
const Actor = require('../models/actor');
const fs = require('node:fs');
const path = require('path');
const Genre = require('../models/genre');
const Movies_Actors = require('../models/movies_actors');
const sequelize = require('sequelize');

const controller = {
    getAllMovies: async (req, res) => {
        const movies = await Movie.findAll({
            include: [{ model: Actor, through: { attributes: [] } }]
        });
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
        const movie = await Movie.findByPk(id, {
            include: [{ model: Actor, through: { attributes: [] } }, { model: Genre, attributes: ['name'] }]
        });
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
            include: [{ model: Actor, through: { attributes: ['actor'] } }],
            where: {
                genre: genre
            }
        });
        if (movies.length > 0) {
            console.log(movies);
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
        console.log(date);
        const movies = await Movie.findAll({
            include: [{ model: Actor, through: { attributes: [] } }, { model: Genre, attributes: ['name'] }],
            where: {
                date: date
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
        try {
            const id = req.params.id;
            const actors_in_movie = await Movies_Actors.findAll({
                where: {
                    idmovies: id
                },
                attributes: ['idactors'],
                raw: true
            });
            const actorIds = actors_in_movie.map(actor => actor.idactors);
            if (actorIds.length > 0) {
                const actorMovieCounts = await Movies_Actors.findAll({
                    where: { idactors: actorIds },
                    attributes: ['idactors', [sequelize.fn('COUNT', sequelize.col('idmovies')), 'count']],
                    group: ['idactors'],
                    raw: true
                });

                for (let amc of actorMovieCounts) {
                    console.log(`actorMovieCounts: actor: ${amc.idactors} // contador: ${amc.count}`);
                }

                const actorsToDelete = actorMovieCounts
                    .filter(actor => {
                        console.log(actor);
                        return actor.count === 1
                    })
                    .map(actor => actor.idactors);

                for (let atd of actorsToDelete) {
                    console.log(atd);
                    console.log(`actorsToDelete: actor: ${atd.idactors} // contador: ${atd.count} // ${atd.status}`);
                }

                if (actorsToDelete.length > 0) {
                    await Movies_Actors.destroy({
                        where: {
                            idmovies: id
                        }
                    });
                    for (let a of actorsToDelete) {
                        await Actor.destroy({ where: { id: a } });
                    }
                }
            }

            await Movie.destroy({
                where: {
                    id
                }
            });
            return res.status(200).send({
                message: "La película ha sido eliminada de manera exitosa."
            })

        } catch (error) {
            console.log(error);
            return res.status(404).send({
                message: "error al borrar la película",

            });
        }
    },

    saveMovie: async (req, res) => {
        const movie = new Movie();
        try {
            const { name, synopsis, date, genre, studio, age, qualification, duration } = req.body;
            const image = saveImage(req.file, name);
            const actors = req.body.actors;
            const movie = await Movie.create({ name, image, synopsis, date, genre, studio, age, qualification, duration });
            if (!movie) {
                return res.status(500).send({
                    message: "Error al guardar la película."
                })
            }
            console.log(actors);
            if (actors && actors.length > 0) {
                const actors_saved = JSON.parse(actors);
                console.log(actors_saved);
                console.log("si entra a esta condicion")
                const actorInstances = await Promise.all(
                    actors_saved.map(async (name) => {
                        const [actor] = await Actor.findOrCreate({
                            where: { actor: name.actor },
                            defaults: { actor: name.actor }
                        });
                        console.log(actor);
                        return actor.id;
                    })
                );
                await movie.addActors(actorInstances);
            }

            await movie.save();
            return res.status(200).send({
                message: `La película ${movie.name} ha sido guardada exitosamente`
            });
        }
        catch (error) {
            console.log(`Error al guardar la película. ${error}`);
            return res.status(500).send({
                message: "Error al guardar la película.",
                error: error
            });
        }
    },
    updateMovie: async (req, res) => {
        const id = req.params.id;
        const data_update = req.body;
        try {
            const movie = await Movie.findByPk(id);
            if (movie) {
                if (req.file) {
                    fs.unlinkSync(movie.image);
                    movie.image = saveImage(req.file, movie.name);
                }
                Object.assign(movie, data_update);
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
    },

    getMoviesByQualification: async (req, res) => {
        const qualification = req.params.qualification;
        const movies = await Movie.findAll({
            include: [{ model: Actor, through: { attributes: [] } }, { model: Genre, attributes: ['name'] }],
            where: {
                qualification: qualification
            }
        });
        if (movies.length > 0) {
            console.log(movies);
            return res.status(200).send({
                message: `Se han encontrado una o más películas con calificación de ${qualification} estrellas`,
                movies: movies
            })
        } else {
            return res.status(404).send({
                message: `No existen películas con calificación ${qualification}`
            })
        }
    },

    getMoviesByActor: async (req, res) => {
        const actor = req.params.actor;
        const actor_find = await Actor.findOne({
            where: {
                actor: actor
            },
            attributes: ['id']
        })
        const id = actor_find.id;
        const actor_movies = await Movies_Actors.findAll({
            where: {
                idactors: id
            },
            attributes: ['idmovies'],
            raw: true
        });
        const movies = await Movie.findAll({
            include: [{ model: Actor, through: { attributes: [] } }, { model: Genre, attributes: ['name'] }],
            where:{
                id: actor_movies.map(a => a.idmovies)
            }
        })
        console.log(movies);
        return res.status(200).send({
            message: `Hemos encontrado una o más películas donde actúa ${actor}`,
            movies: movies
        });
    }
};

function saveImage(file, name) {
    const format = "." + (file.originalname.split(".", 2))[1];
    const new_path = path.join(__dirname, `../public/files/${name}${format}`);
    fs.renameSync(file.path, new_path);
    return new_path;
}

module.exports = controller;