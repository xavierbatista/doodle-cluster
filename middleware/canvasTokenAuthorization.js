//checks that the jwt token is valid
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const canvasToken = req.header('canvasToken');

    //check that there is even a token. If not, it sends them one, but they cannot use it to submit photos. It's only used to keep track of what canvas they are using.

    if (!canvasToken) {
      return res.status(403).json('Not authorized');
    }

    //verify if token is real. if it is, it will return the information/payload (userID) in the token.
    const payload = jwt.verify(canvasToken, process.env.jwtSecret);

    req.canvasId = payload.canvasId;
    req.isNewUser = payload.isNewUser;

    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json('Not authorized');
  }
};
