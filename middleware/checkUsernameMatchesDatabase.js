const pool = require('../db');

module.exports = async (req, res, next) => {
  try {
    //only does this middleware if the user is logged in
    if (req.isNewUser === false) {
      const canvasId = req.canvasId;
      const username = req.username;

      const checkUsernameMatchesDatabase = await pool.query(
        'SELECT current_user_username FROM canvases WHERE canvas_id = $1',
        [canvasId]
      );

      const usernameInDatabase =
        checkUsernameMatchesDatabase.rows[0].current_user_username;

      if (username !== usernameInDatabase) {
        return res.sendStatus(403);
      }
    }

    next();
  } catch (error) {
    console.error(error.message);
  }
};
