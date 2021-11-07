const router = require('express').Router();
const canvasTokenAuthorization = require('../middleware/canvasTokenAuthorization');
const pool = require('../db');
const checkCanvasTokenMatchesDatabase = require('../middleware/checkCanvasTokenMatchesDatabase');
const authorization = require('../middleware/authorization');
const checkUsernameMatchesDatabase = require('../middleware/checkUsernameMatchesDatabase');

router.put(
  '/',
  authorization,
  canvasTokenAuthorization,
  checkUsernameMatchesDatabase,
  checkCanvasTokenMatchesDatabase,
  async (req, res) => {
    try {
      const canvasId = req.canvasId;
      const updateLastInUse = await pool.query(
        "UPDATE canvases SET last_in_use = NOW() - INTERVAL '15 SECONDS' WHERE canvas_id = $1",
        [canvasId]
      );
      res.sendStatus(201);
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = router;
