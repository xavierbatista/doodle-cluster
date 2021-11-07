const pool = require('../db');

module.exports = async (req, res, next) => {
  try {
    //only does this middleware if the user is logged in
    if (req.isNewUser === false) {
      const canvasId = req.canvasId;
      const canvasToken = req.header('canvasToken');

      const checkCanvasTokenMatchesDatabase = await pool.query(
        'SELECT canvas_token FROM canvases WHERE canvas_id = $1',
        [canvasId]
      );

      const canvasTokenInDatabase =
        checkCanvasTokenMatchesDatabase.rows[0].canvas_token;

      if (canvasTokenInDatabase !== canvasToken) {
        return res.sendStatus(403);
      }
    }
    next();
  } catch (error) {
    console.error(error.message);
  }
};
