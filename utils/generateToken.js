// utils/generateToken.js
const jwt = require('jsonwebtoken');  // Importar jwt

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },  // Los datos que quieres incluir en el payload (por ejemplo, el id del usuario)
    process.env.JWT_SECRET,  // La clave secreta para firmar el token
    { expiresIn: '30d' }  // Establecer el tiempo de expiración del token (por ejemplo, 30 días)
  );
};

module.exports = generateToken;
