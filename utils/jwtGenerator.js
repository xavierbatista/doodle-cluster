const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(userId, username) {
  const payload = {
    userId,
    username,
  };

  return jwt.sign(payload, process.env.jwtSecret);
}

module.exports = jwtGenerator;
