'use strict'

const express = require('express');
const app = express();
const connection = require('./src/config/db');
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

// PUERTO DEL SERVIDOR
const PORT = process.env.PORT; 

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// HABILITAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo por el puerto: ${PORT}`);
    // CONEXIÓN BASE DE DATOS
    connection.connect((error) => {
        if(error){
            console.log(`Error de conexión a la base de datos: ${error}`);
            return;
        }
        console.log('Conexión exitosa a la base de datos.')
    });
})