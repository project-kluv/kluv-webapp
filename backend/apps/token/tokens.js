const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = mongoose.model('Token', new Schema({
    address:{ type: String },
    name:{type:String},
    price: { type: Number, default: 0 },
    dateTime: { type: Date, default: Date.now },
}, {
  versionKey: false,
  collections :"tokens"
}))