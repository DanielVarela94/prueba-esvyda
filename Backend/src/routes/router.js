'use strict'

const express = require('express');
const router = express.Router();
const GenreController = require('../controllers/genre');
const MovieController = require('../controllers/movie');


//RUTAS GENERO
router.get('/get-genre/:id', GenreController.getGenre);
router.get('/get-genres', GenreController.getAllGenres);
router.post('/save-genre', GenreController.saveNewGenre);


//RUTAS PELICULAS
router.get('/get-movies', MovieController.getAllMovies);
router.post('/save-movie', MovieController.saveMovie);
router.put('/update-movie', MovieController.updateMovie);
router.get('/get-movie/:id', MovieController.getMovieById);
router.get('/get-movies-by-genre/:genre', MovieController.getMoviesByGenre);
router.get('/get-movies-by-date/:date', MovieController.getMoviesByDate);
router.delete('/delete-movie/:id', MovieController.deleteMovie);
router.post('/save-movie', MovieController.saveMovie);
//router.get('/get-movies-by-actor/:actor', MovieController.getMoviesByActor);

module.exports = router;