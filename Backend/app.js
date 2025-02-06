'use strict'

const express = require('express');
const app = express();
//const connection = require('./src/config/db');
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });
const db_export = require('./src/config/db');

// PUERTO DEL SERVIDOR
const PORT = process.env.PORT; 

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// HABILITAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo por el puerto: ${PORT}`);
    //LLAMADA A FUNCION PARA CONECTAR A BASE DE DATOS.
    db_export.dbConnection();
});


app.get('/test', (req, res) => {
    res.status(200).send({
        message: "Hola test"
    });
});