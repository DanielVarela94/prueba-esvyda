'use strict'

const express = require('express');
const multer = require('multer');

const router = express.Router();
const GenreController = require('../controllers/genre');
const MovieController = require('../controllers/movie');
const ActorController = require('../controllers/actor');
const MovieActorController = require('../controllers/movies_actors')

const files = multer({ dest: './src/public/files/'});

//RUTAS GENERO
router.get('/get-movies-genre/:id', GenreController.getMoviesGenre);
router.get('/get-genres', GenreController.getAllGenres);
router.post('/save-genre', GenreController.saveNewGenre);

//RUTAS ACTOR
router.get('/get-actor/:name', ActorController.getActor);
router.get('/get-actors', ActorController.getAllActors);
router.post('/save-actor', ActorController.saveNewActor);

//RUTAS PELICULAS
router.get('/get-movies', MovieController.getAllMovies);
router.put('/update-movie', MovieController.updateMovie);
router.get('/get-movie/:id', MovieController.getMovieById);
router.get('/get-movies-by-genre/:genre', MovieController.getMoviesByGenre);
router.get('/get-movies-by-date/:date', MovieController.getMoviesByDate);
router.delete('/delete-movie/:id', MovieController.deleteMovie);
router.post('/save-movie', files.single('image'), MovieController.saveMovie);
router.patch('/update-movie/:id', files.single('image'), MovieController.updateMovie);

//RUTA CALIFICACION
router.get('/get-movies-qualification/:qualification', MovieController.getMoviesByQualification);

//RUTAS TABLA INTRMEDIA PELICULAS Y ACTORES
router.get('/get-relations', MovieActorController.getAllMoviesActors);
router.get('/get-relation/:id', MovieActorController.getMovieActor);
router.post('/save-relation', MovieActorController.saveNewMovieActor);

module.exports = router;