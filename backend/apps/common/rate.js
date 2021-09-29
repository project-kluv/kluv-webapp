const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = mongoose.model('Rate', new Schema({
    name:{type:String},
    rate: { type: Number, default: 0 },
    date: { type: String },
}, {
  versionKey: false,
  collections :"rates"
}))