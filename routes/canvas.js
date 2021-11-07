const router = require('express').Router();
const authorization = require('../middleware/authorization');
const canvasTokenAuthorization = require('../middleware/canvasTokenAuthorization');
const checkCanvasTokenMatchesDatabase = require('../middleware/checkCanvasTokenMatchesDatabase');
const canvasController = require('../controllers/canvasController/canvasController');
const checkUsernameMatchesDatabase = require('../middleware/checkUsernameMatchesDatabase');

router.get(
  '/',
  authorization,
  checkCanvasTokenMatchesDatabase,
  checkUsernameMatchesDatabase,
  canvasController.getCanvas
);

router.get('/new-user-canvas', canvasController.getNewUserCanvas);

//UPDATE CANVAS
router.put(
  '/',
  authorization,
  canvasTokenAuthorization,
  checkCanvasTokenMatchesDatabase,
  checkUsernameMatchesDatabase,
  canvasController.updateCanvas
);

module.exports = router;
