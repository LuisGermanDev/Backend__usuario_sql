const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const generateToken = require('../utils/generateToken'); // Utilidad para generar el token

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      nombre,
      email,
      password: hashedPassword,
      rol,
    });

    const token = generateToken(user.id);

    // Configurar cookie para el token JWT
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

// Iniciar sesión y devolver un token
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Comparar las contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = generateToken(user.id);

    // Establecer el token como cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Cerrar sesión (eliminar la cookie)
const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
};

module.exports = { registerUser, loginUser, logoutUser };
