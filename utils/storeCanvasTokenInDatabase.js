//Stores canvasToken in the database so it can check the user has access to that canvas on each request
const pool = require('../db');

module.exports = async (canvasToken, canvasId) => {
  try {
    const storeCanvasToken = await pool.query(
      'UPDATE canvases SET canvas_token = $1 WHERE canvas_id = $2',
      [canvasToken, canvasId]
    );
  } catch (error) {
    console.error(error.message);
  }
};
