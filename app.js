// =============================
// IMPORTAR LIBRERÍAS
// =============================
const express = require("express");
const sequelize = require("./config/database");

// IMPORTAR MODELOS
const Usuario = require("./models/Usuario");
const Publicacion = require("./models/Publicacion");

const app = express();
app.use(express.json());


// =============================
// RELACIONES
// =============================

// Un usuario tiene muchas publicaciones
Usuario.hasMany(Publicacion, {
  foreignKey: "UsuarioId",
  onDelete: "CASCADE",
});

// Una publicación pertenece a un usuario
Publicacion.belongsTo(Usuario, {
  foreignKey: "UsuarioId",
});


// =============================
// FUNCIÓN PRINCIPAL
// =============================
async function iniciar() {
  try {
    // Conectar DB
    await sequelize.authenticate();
    console.log("✅ Conectado a PostgreSQL");

    // Crear tablas
    await sequelize.sync({ force: true });
    console.log("✅ Tablas creadas");

    // =============================
    // CREAR USUARIO
    // =============================
    const nuevoUsuario = await Usuario.create({
      nombre: "Carlos",
      email: "carlos@example.com",
    });

    console.log("Usuario creado:", nuevoUsuario.toJSON());

    // =============================
    // CREAR PUBLICACIÓN RELACIONADA
    // =============================
    await nuevoUsuario.createPublicacion({
      titulo: "Mi primera publicación",
      contenido:
        "Este es el contenido de mi post, creado con Sequelize.",
    });

    console.log("Publicación creada");

    // =============================
    // CONSULTAR CON EAGER LOADING
    // =============================
    const usuarioConPublicaciones = await Usuario.findByPk(
      nuevoUsuario.id,
      { include: Publicacion }
    );

    console.log(
      "Usuario con publicaciones:",
      JSON.stringify(usuarioConPublicaciones, null, 2)
    );
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

iniciar();

// Servidor Express
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});