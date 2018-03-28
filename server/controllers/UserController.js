const User = require('../models/user')

module.exports = {
  fbLogin: (req, res) => {
    User.findOne({email: req.body.response.email})
      .exec()
      .then(foundUser => {
        if (foundUser) {
          let data = {
            token: req.token,
            fbData: req.body.response,
            userData: foundUser,
            message: 'Login succesful'
          }
          return res.status(200).json({data})
        } else {
          let newUser = new User({
            name: req.body.response.name,
            email: req.body.response.email,
            profile_pic_url: req.body.response.picture.data.url
          })
          newUser.save((err,createdUser)=>{
            if (err) {
              return res.status(500).json({
                message: "User failed to be created",
                err
              })
            }
            let data = {
              token:req.token,
              fbData: req.body.response,
              userData: createdUser,
              message:'jwt login succesful'
            }
            return res.status(200).json(data)
          })
        }
      }).catch(err => {
        res.status(500).json({
          message: 'Something went wrong',
          err
        })
      })
  }
};
