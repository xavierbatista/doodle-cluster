const pool = require('../../db');
const deleteOldCanvases = require('../..//utils/deleteOldCanvases');
const storeCanvasTokenInDatabase = require('../../utils/storeCanvasTokenInDatabase');
const canvasJwtGenerator = require('../../utils/canvasJwtGenerator');
const removeUserFromOtherCanvases = require('../../utils/removeUserFromOtherCanvases');

const getCanvas = async (req, res) => {
  try {
    const username = req.username;
    removeUserFromOtherCanvases(username);
    const maxPreviousDrawers = 30;
    const getCanvas = await pool.query(
      "UPDATE canvases SET last_in_use = NOW(), current_user_username = $1 WHERE canvas_id = (SELECT canvas_id FROM canvases WHERE last_in_use < NOW() - INTERVAL '15 seconds' ORDER BY RANDOM() LIMIT 1) RETURNING *",
      [username]
    );
    //checks if there is an open canvas
    if (getCanvas.rows.length !== 0) {
      const canvasId = getCanvas.rows[0].canvas_id;
      const imgData = getCanvas.rows[0].img_data;

      const canvasToken = canvasJwtGenerator(canvasId, false);

      storeCanvasTokenInDatabase(canvasToken, canvasId);

      //get previous drawers
      const getPreviousDrawers = await pool.query(
        'SELECT id, username, date, img_data FROM previous_drawers WHERE canvas_id = $1 ORDER BY id DESC limit $2',
        [canvasId, maxPreviousDrawers]
      );

      const previousDrawers = getPreviousDrawers.rows;
      res.json({
        canvasId,
        imgData,
        canvasToken,
        previousDrawers,
      });
    } else {
      //if not, it creates a new one in database
      const username = req.username;
      removeUserFromOtherCanvases(username);

      const createNewCanvas = await pool.query(
        'INSERT INTO canvases(current_user_username,last_in_use) VALUES ($1, NOW()) returning *',
        [username]
      );
      const canvasId = createNewCanvas.rows[0].canvas_id;
      const canvasToken = canvasJwtGenerator(canvasId);

      storeCanvasTokenInDatabase(canvasToken, canvasId);
      deleteOldCanvases();
      res.json({ canvasId, canvasToken });
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = getCanvas;
