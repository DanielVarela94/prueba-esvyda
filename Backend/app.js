'use strict'

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

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


app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PATCH,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use('/files', express.static(path.join(__dirname, 'src/public/files')));

app.use('/', router);