const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config"); // Importar la instancia de sequelize

const User = sequelize.define("User", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("tecnico", "gerente", "admin"),
    allowNull: false,
  },
});

// Sincronización de modelo si se necesita (esto creará la tabla en la base de datos si no existe)
User.sync()
  .then(() => console.log("Tabla de usuarios sincronizada"))
  .catch((error) =>
    console.log("Error al sincronizar la tabla de usuarios:", error)
  );

module.exports = User;
