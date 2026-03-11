//Conectamos Node con PostgreSQL usando Sequelize.

// Importamos Sequelize
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Creamos conexión con PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false, // evita mostrar SQL en consola
  }
);

// Exportamos conexión
module.exports = sequelize;