const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = mongoose.model('CexPrice', new Schema({
    cex:{ type: String },
    ticker:{type:String},
    price: { type: Number, default: 0 },
    dateTime: { type: Date, default: Date.now },
}, {
  versionKey: false,
  collection :"CEX_PRICE"
}))