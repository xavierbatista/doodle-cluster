const router = require('express').Router();
const authorization = require('../middleware/authorization');
const pool = require('../db');

const minutes = 1;

router.get('/', authorization, async (req, res) => {
  try {
    const username = req.username;
    const usersRecentDrawings = await pool.query(
      'SELECT id, img_data FROM previous_drawers WHERE username = $1 ORDER BY id DESC LIMIT 21',
      [username]
    );
    res.json(usersRecentDrawings.rows);
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
