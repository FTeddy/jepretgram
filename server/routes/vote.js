const express = require('express');
const router = express.Router();
const JWT = require('../middleware/jwt.js');
const VoteController = require('../controllers/VoteController.js')

router.get('/up/:picId/:userId', JWT.authJWT, VoteController.voteImage)
router.get('/down/:picId/:userId', JWT.authJWT, VoteController.voteImage)

module.exports = router;
