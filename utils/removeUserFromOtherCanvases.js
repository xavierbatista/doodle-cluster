const pool = require('../db');

module.exports = async (username) => {
  try {
    const removeUserFromOtherCanvases = await pool.query(
      "UPDATE canvases SET last_in_use = NOW() - INTERVAL '15 SECONDS', current_user_username = NULL WHERE canvas_id IN (SELECT canvas_id FROM canvases WHERE current_user_username = $1)",
      [username]
    );
  } catch (error) {
    console.error(error.message);
  }
};
