const express = require('express');
const router = express.Router();
const JWT = require('../middleware/jwt.js');
const memupload = require('../middleware/multer.js')
const { googleUpload, googleDelete } = require('../middleware/g-cloud-upload.js')
const PicController = require('../controllers/PicController.js')

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// recent
router.get('/', PicController.getRecent)
// user's
router.get('/:userId', PicController.getUserPic)
router.get('/:picId', PicController.getOnePic)
// post with caps
router.post('/post/:userId',memupload.single('image'), JWT.authJWT, googleUpload, PicController.postPic)
// edit caps
router.put('/edit/:picId/:userId', JWT.authJWT, PicController.editCaps)
router.delete('delete/:picId/:userId', JWT.authJWT, googleDelete,PicController.deletePic)


module.exports = router;
