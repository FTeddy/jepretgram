const mongoose = require('mongoose')
const Schema = mongoose.Schema

var VoteSchema = new Schema({
    value : Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    picId: {
      type: Schema.Types.ObjectId,
      ref: 'Pic'
    }
}, {timestamps: true})

module.exports = mongoose.model('Vote',VoteSchema)
