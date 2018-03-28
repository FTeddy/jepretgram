const mongoose = require('mongoose')
const Schema = mongoose.Schema

var PicSchema = new Schema({
    imgUrl : String,
    caption : String,
    UserId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
}, {timestamps: true})

module.exports = mongoose.model('Pic',PicSchema)
