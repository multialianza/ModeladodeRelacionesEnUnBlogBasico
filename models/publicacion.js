//Modelo Publicación con título y contenido.

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Definimos modelo Publicacion
const Publicacion = sequelize.define(
  "Publicacion",
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "publicaciones",
    timestamps: true,
  }
);

module.exports = Publicacion;