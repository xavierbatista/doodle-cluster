const jwt = require('jsonwebtoken');
require('dotenv').config();

function canvasJwtGenerator(canvasId, isNewUser) {
  const payload = {
    canvasId,
    isNewUser,
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: '24h' });
}

module.exports = canvasJwtGenerator;
