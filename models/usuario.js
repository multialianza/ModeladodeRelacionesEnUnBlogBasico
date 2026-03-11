//Modelo Usuario con nombre y email.

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definimos modelo Usuario
const Usuario = sequelize.define(
  "Usuario",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "usuarios",
    timestamps: true,
  }
);

module.exports = Usuario;