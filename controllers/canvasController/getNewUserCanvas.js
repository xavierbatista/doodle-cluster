const pool = require('../../db');
const deleteOldCanvases = require('../..//utils/deleteOldCanvases');
const storeCanvasTokenInDatabase = require('../../utils/storeCanvasTokenInDatabase');
const canvasJwtGenerator = require('../../utils/canvasJwtGenerator');

const getCanvas = async (req, res) => {
  try {
    const maxPreviousDrawers = 30;
    const getCanvas = await pool.query(
      'SELECT * FROM canvases ORDER BY RANDOM() LIMIT 1'
    );
    //checks if there is an open canvas

    const canvasId = getCanvas.rows[0].canvas_id;
    const imgData = getCanvas.rows[0].img_data;

    const canvasToken = canvasJwtGenerator(canvasId, true);

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
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = getCanvas;
