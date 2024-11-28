// controllers/userController.js
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');  // Utilidad para generar el token
const User = require('../models/user.model');

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
    });

    const token = generateToken(user.id);  // Usar generateToken para crear el JWT

    // Configurar cookie para el token JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(201).send({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).send({ message: 'Error al registrar el usuario', error });
  }
};

// Función para iniciar sesión y devolver un token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    // Comparar las contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Contraseña incorrecta' });
    }

    const token = generateToken(user.id);  // Usar generateToken para crear el JWT

    // Establecer el token como cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).send({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).send({ message: 'Error al iniciar sesión', error });
  }
};

// Función para cerrar sesión (eliminar la cookie)
const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).send({ message: 'Sesión cerrada exitosamente' });
};

module.exports = { registerUser, loginUser, logoutUser };
