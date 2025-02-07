'use strict'
//IMPORTACIÓN VARIABLES DE ENTORNO
const dotenv = require('dotenv'); 
dotenv.config({ path: './env/.env' });

//SEQUELIZE
const { Sequelize } = require('sequelize');
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-05:00',
    logging: false,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
})

//CONEXION A LA BASE DE DATOS
async function dbConnection(){
    try{
        await db.authenticate();
        console.log('Base de datos conectada exitosamente.');
    }
    catch(err){
        console.log(err);
        throw new Error (err);
    }
}

const db_export = {
    db,
    dbConnection
}

module.exports = db_export;