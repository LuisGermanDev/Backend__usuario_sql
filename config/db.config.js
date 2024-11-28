const { Sequelize } = require('sequelize');
require('dotenv').config();  // Cargar variables de entorno

// Configura Sequelize con la información de la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,    // Nombre de la base de datos
  process.env.DB_USER,    // Usuario de la base de datos
  process.env.DB_PASSWORD, // Contraseña de la base de datos
  {
    host: process.env.DB_HOST,   // Host de la base de datos (localhost por defecto)
    dialect: 'mysql',  // Tipo de base de datos (MySQL)
  }
);

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Autenticación con la base de datos
    console.log('Conectado a la base de datos MySQL');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);  // Salir con código de error si no se puede conectar
  }
};

// Exportar la instancia de Sequelize y la función de conexión
module.exports = { sequelize, connectDB };
