const poolService = require('../pool/poolService')
const Token = require('./tokens')

const insertTokenInfo = function(){
	console.log("insert!")
	const swapName = "klayswap"
	rtn = poolService.getAllTokenPrice(swapName, function(rslt){
	  if(rslt.success){
		const tokenPrice = rslt.response.token
		var tokenKeys = Object.keys(tokenPrice)
		var arr = []
		tokenKeys.forEach(key => {
		  var address = key
		  var symbol = tokenPrice[key].symbol
		  var swapPriceUsd = (tokenPrice[key].price).toFixed(3)
		  var token = new Token({
			address:address,
			name:symbol,
			price:swapPriceUsd,
		  })
		  arr.push(token)
		});
	    Token.insertMany(arr)
	  }else{
		  console.log("ERROR!!!")
	  }
  });
	
  }
  
  module.exports = {
	insertTokenInfo:insertTokenInfo
  }