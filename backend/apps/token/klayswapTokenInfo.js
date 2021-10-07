const mongoose = require('mongoose')

const Schema = mongoose.Schema

module.exports = mongoose.model('SwapTokenInfo', new Schema({
    type:{type: String}, //token or lp
    address:{ type: String },
    symbol:{type:String},
    name: { type: String},
    decimals: { type: Number},
}, {
  versionKey: false,
  collection :"KLAYSWAP_TOKEN_INFO"
}))