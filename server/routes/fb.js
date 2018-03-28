const express = require('express');
const router = express.Router();
const JWT = require('../middleware/jwt.js');
const memupload = require('../middleware/multer.js')
const { googleUpload, googleDelete } = require('../middleware/g-cloud-upload.js')
const UserController = require('../controllers/UserController.js')

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.post('/', JWT.getJWT, UserController.fbLogin)

module.exports = router;
