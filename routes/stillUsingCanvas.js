const router = require('express').Router();
const canvasTokenAuthorization = require('../middleware/canvasTokenAuthorization');
const pool = require('../db');
const checkCanvasTokenMatchesDatabase = require('../middleware/checkCanvasTokenMatchesDatabase');
const checkUsernameMatchesDatabase = require('../middleware/checkUsernameMatchesDatabase');
const authorization = require('../middleware/authorization');


router.put(
  '/',
  canvasTokenAuthorization,
  authorization,
  checkCanvasTokenMatchesDatabase,
  checkUsernameMatchesDatabase,
  async (req, res) => {
    try {
      if (!req.isNewUser) {
        const canvasId = req.canvasId;
        const updateLastInUse = await pool.query(
          'UPDATE canvases SET last_in_use = NOW() WHERE canvas_id = $1',
          [canvasId]
        );

        res.sendStatus(201);
      } else {
        return res.sendStatus(403);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
);

module.exports = router;
