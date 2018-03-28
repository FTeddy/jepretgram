const express = require('express');
const router = express.Router();
const JWT = require('../middleware/jwt.js');
const VoteController = require('../controllers/VoteController.js')

router.post('/up/:picId/:userId', JWT.authJWT, VoteController.voteImage)
router.get('/:picId', VoteController.getVotes)
router.post('/down/:picId/:userId', JWT.authJWT, VoteController.unVoteImage)

module.exports = router;
