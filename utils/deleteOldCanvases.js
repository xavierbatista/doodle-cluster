const pool = require('../db');

module.exports = async () => {
  const maxNumberOfCanvases = 200;
  const amountOfCanvasesDeleting = 10;

  try {
    const checkIfTooManyCanvases = await pool.query(
      'SELECT COUNT(canvases) AS number_of_canvases FROM canvases'
    );

    const numberOfCanvases = checkIfTooManyCanvases.rows[0].number_of_canvases;

    if (numberOfCanvases > maxNumberOfCanvases) {
      const deleteUnusedCanvases = await pool.query(
        'DELETE FROM canvases WHERE canvas_id IN (SELECT canvas_id FROM canvases ORDER BY canvas_id ASC LIMIT $1) RETURNING canvas_id',
        [amountOfCanvasesDeleting]
      );
    }
  } catch (error) {
    console.error(error.message);
  }
};
