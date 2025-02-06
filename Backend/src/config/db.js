const mysql = require('mysql2');
//IMPORTACIÓN VARIABLES DE ENTORNO
const dotenv = require('dotenv'); 
dotenv.config({ path: './env/.env' });

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports = connection;