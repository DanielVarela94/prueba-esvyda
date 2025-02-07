'use strict'

const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: './env/.env' });
const db_export = require('./src/config/db');
var router = require('./src/routes/router');


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

app.use('/', router);