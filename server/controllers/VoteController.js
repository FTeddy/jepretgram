const Vote = require('../models/vote')
const User = require('../models/User')

module.exports = {
  voteImage: (req, res) => {
    let newVote = new Vote({
      value: 1,
      userId: req.params.userId
      picId: req.params.picId
    })
    newVote.save((err, savedVote) => {
      if (err) {
        return res.status(500).json({
          message: "Vote failed to be saved"
        })
      }
      return res.status(201).json({
        message: 'Article created',
        vote: savedVote
      })
    })
  },
  unVoteImage: (req, res) => {
    Vote.findOne({
      picId: req.params.picId,
      userId: req.params.userId
    }).exec()
      then(foundVote => {
        if (!foundVote) {
          return res.status(404).json({
            message: "Vote not found"
          })
        }
        foundVote.remove()
          .then(deletedVote = {
            res.status(200).json({
              message: 'Successfully deleted Vote',
              vote: removedVote
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
};
