'use strict'
var Actor = require('../models/actor')

var controller = {
    getAllActors: async (req, res) => {
        const actors = await Actor.findAll();
        if (actors.length > 0 ) {
            return res.status(200).send({
                message: "Se ha encontrado uno o más actores.",
                actors: actors
            });
        } else {
            return res.status(404).send({
                message: "No se ha encontrado ningún actor."
            });
        }
    },

    saveNewActor: async (req, res) => {
        const actor = new Actor();
        try {
            actor.actor = req.body.name;
            await actor.save();
            return res.status(200).send({
                message: "El actor se ha guardado con éxito",
                actor: actor.actor
            });
        } catch (error) {
            console.log(`Error al guardar el actor: ${error}`);
            return res.status(500).send({
                message: "Error al guardar el actor."
            });
        }
    },

    getActor: async (req, res) => {
        const name = req.params.name;
        const actor = await Actor.findByPk(name);
        if (actor) {
            return res.status(200).send({
                message: "Actor encontrado",
                actor: actor
            });
        } else {
            return res.status(404).send({
                message: `No existe un actor con nombre: ${name}`
            })
        }
    }
};

module.exports = controller;
