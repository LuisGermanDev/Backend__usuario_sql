const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();

// Registrar un nuevo usuario
router.post('/register', registerUser);

// Iniciar sesión y generar el token (almacenado en cookies)
router.post('/login', loginUser);

// Cerrar sesión (eliminar el token)
router.post('/logout', logoutUser);

module.exports = router;
