const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
    name : String,
    email : String,
    profile_pic_url: {
      type: String,
      default: 'undefined'
    },
    picId: [{
      type: Schema.Types.ObjectId,
      ref: 'Pic'
    }]
}, {timestamps: true})

module.exports = mongoose.model('User',UserSchema)
