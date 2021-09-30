const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = mongoose.model('Current', new Schema({
    address:{ type: String },
    name:{type:String},
    symbol:{type:String},
    price: { type: Number, default: 0 },
    exPrice: { type: Number, default: 0 },
    dateTime: { type: Date, default: Date.now },
}, {
  versionKey: false,
  collection :"CURRENT_PRICE"
}))