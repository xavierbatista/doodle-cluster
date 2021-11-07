const deleteOldPreviousDrawers = require('../../utils/deleteOldPreviousDrawers');
const pool = require('../../db');

const updateCanvas = async (req, res) => {
  try {
    const canvasId = req.canvasId;
    const username = req.username;
    const isNewUser = req.isNewUser;

    const { imgData } = req.body;
    //updates canvas to new drawing
    const updateCanvas = await pool.query(
      'UPDATE canvases SET img_data = $1 WHERE canvas_id = $2',
      [imgData, canvasId]
    );
    //adds username to list of usernames
    const addDrawerToList = await pool.query(
      'INSERT INTO previous_drawers(canvas_id, username, img_data) VALUES($1, $2, $3)',
      [canvasId, username, imgData]
    );

    deleteOldPreviousDrawers(canvasId);

    res.sendStatus(203);
  } catch (error) {
    console.error(error);
    res.sendStatus(204);
  }
};

module.exports = updateCanvas;
