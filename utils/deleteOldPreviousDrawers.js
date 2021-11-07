const pool = require('../db');

async function deleteOldPreviousDrawers(canvasId) {
  const maxPreviousDrawers = 30;
  const amountOfPreviousDrawersDeleting = 5;

  try {
    const checkNumberOfPreviousDrawers = await pool.query(
      'SELECT COUNT(previous_drawers) AS number_of_previous_drawers FROM previous_drawers where canvas_id = $1',
      [canvasId]
    );

    const numberOfPreviousDrawers =
      checkNumberOfPreviousDrawers.rows[0].number_of_previous_drawers;

    if (numberOfPreviousDrawers > maxPreviousDrawers) {
      const deleteOldPreviousDrawers = await pool.query(
        'DELETE FROM previous_drawers WHERE id IN (SELECT id FROM previous_drawers WHERE canvas_id = $1 ORDER BY id LIMIT $2)',
        [canvasId, amountOfPreviousDrawersDeleting]
      );
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = deleteOldPreviousDrawers;
