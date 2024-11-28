const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {connectDB} = require("./config/db.config"); // Asegúrate de importar correctamente
const cookieParser = require("cookie-parser");

dotenv.config(); // Cargar las variables de entorno
connectDB(); // Llamar la función para conectar a la base de datos

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors()); // Habilitar CORS para todas las solicitudes

// Rutas de la API
app.use("/api/users", require("./routes/user.routes"));

// Ruta inicial de prueba
app.get("/", (req, res) => {
    res.send("¡API funcionando!");
  });
module.exports = app;
