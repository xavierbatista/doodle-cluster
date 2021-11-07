//checks that the jwt token is valid
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const token = req.header('token');

    //check that there is even a token. If not, it sends them one, but they cannot use it to submit photos. It's only used to keep track of what canvas they are using.

    if (!token) {
      return res.sendStatus(403);
    }

    //verify if token is real. if it is, it will return the information/payload (userID) in the token.
    const payload = jwt.verify(token, process.env.jwtSecret);

    req.userId = payload.userId;
    req.username = payload.username;

    next();
  } catch (error) {
    console.error(error.message);
    return res.sendStatus(403);
  }
};
