const Pic = require('../models/pic')
const User = require('../models/user')

module.exports = {
  getRecent: (req, res) => {
    Pic.find()
      .populate('userId')
      .limit(20)
      .exec()
      .then(foundPics => {
        return res.status(200).json({
          message: 'found recent pics',
          pics: foundPics
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  getUserPic: (req, res) => {
    Pic.find({UserId: req.params.userId})
      .limit(20)
      .exec()
      .then(foundPics => {
        return res.status(200).json({
          message: 'found user pics',
          pics: foundPics
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  getOnePic: (req, res) => {
    Pic.findOne({UserId: req.params.picId})
      .limit(20)
      .exec()
      .then(foundPic => {
        return res.status(200).json({
          message: 'found pic',
          pic: foundPic
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  postPic: (req, res) => {
    console.log(req.decoded);
    console.log(req.file.cloudUrl);
    User.findOne({
      name: req.decoded.name,
      email: req.decoded.email
    }).exec()
      .then(foundUser => {
        if (foundUser === null) {
          return res.status(404).json({
            message: "No matching user was found."
          })
        }
        let imgUrl = req.file.cloudUrl
        let newPic = new Pic({
          imgUrl: imgUrl,
          caption: req.body.caption,
          userId: foundUser._id
        })
        foundUser.picId.push(newPic._id)
        foundUser.save((err, savedUser) => {
          if (err) {
            return res.status(500).json({
              message: "User failed to be saved"
            })
          }
          newPic.save((err2, savedPic) => {
            if (err2) {
              return res.status(500).json({
                message: "Pic failed to be saved"
              })
            }
            return res.status(201).json({
              message: 'Article created',
              pic: savedPic
            })
          })
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  editCaps: (req, res) => {
    let updateData = {}
    if (req.body.caption) {updateData.caption = req.body.caption}
    Pic.findOneAndUpdate({_id: req.params.picId}, updateData, {new: true})
      .exec()
      .then(updatedPic => {
        res.status(200).json({
          message:'Successfully updated Article',
          pic: updatedPic
        })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  },
  deletePic: (req, res) => {
    Pic.findOne({_id: req.params.picId})
      .exec()
      .then(foundPic => {
        if (!foundPic) {
          return res.status(404).json({
            message: 'Pic not found'
          })
        }
        User.findByIdAndUpdate(req.params.userId, {$pull: {picId: req.params.picId}})
          .exec()
          .then(updatedUser => {
            foundPic.remove()
              .then(deletedPic => {
                res.status(200).json({
                  message: 'Successfully deleted Pic',
                  pic: deletedPic
                })
              }).catch(err => {
                res.status(500).json({
                  message: 'Something went wrong',
                  err
                })
              })
          }).catch(err => {
            res.status(500).json({
              message: 'Something went wrong',
              err
            })
          })
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  }
}
