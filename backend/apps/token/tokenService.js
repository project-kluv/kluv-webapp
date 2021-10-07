const poolService = require('../pool/poolService')
const Token = require('./tokens')
const Current = require('./currentData')
const CONSTS = require('../../utils/consts.js');
const SwapTokenInfo = require('./klayswapTokenInfo')
const CexPrice = require('./cexPrice.js')
const axios = require('axios')

const getKlayswapTokenInfo = function(callback){
	SwapTokenInfo.find({ Type : "tk" }, (err, tokens) => {
		callback({success: true,tokenInfo: tokens})
	  });
}

const insertCexPrice = function(){
	axios.get('https://api.bithumb.com/public/ticker/' + "KLAY")
	.then(response => {
	  if(response.status == 200 && response.data.status=='0000'){
		CexPrice.updateOne({cex:CONSTS.CEX.BITHUMB, ticker:"KLAY"},
		  {$set:{cex:CONSTS.CEX.BITHUMB, ticker:"KLAY",price:response.data.data.closing_price,dateTime:Date.now()}
		} , {upsert:true}, function (err, docs) {
		  if (err){
			  console.log(err)
		  }
	  })
	  }
	})
	.catch(error => {
	  console.log(error.message)
	});

	axios.get('https://api.coinone.co.kr/ticker/?currency=KSP')
	.then(response => {
	  if(response.status == 200 && response.data.result=='success'){
		CexPrice.updateOne({cex:CONSTS.CEX.COINONE, ticker:"KSP"},
		  {$set:{cex:CONSTS.CEX.COINONE, ticker:"KSP",price:response.data.last,dateTime:Date.now()}
		} , {upsert:true}, function (err, docs) {
		  if (err){
			  console.log(err)
		  }
	  })
	  }
	})
	.catch(error => {
	  console.log(error.message)
	});
}

const insertTokenInfo = function(isInsertChartData){
	const swapName = "klayswap"
	const now = Date.now()
	rtn = poolService.getAllTokenPrice(swapName, CONSTS.AUTH_NAME.BATCH_JOB, function(rslt){
	  if(rslt.success){
		  const tokenPrice = rslt.response.token
		  var tokenKeys = Object.keys(tokenPrice)
		  tokenKeys.forEach(key => {
			  var address = key
			  Current.updateOne({address:address},{$set:{
				  address:address,
				  name:tokenPrice[key].name,
				  symbol:tokenPrice[key].symbol,
				  price:tokenPrice[key].price,
				  exPrice:tokenPrice[key].price,
				  dateTime:now
				}}, {upsert:true}, function (err, docs) {
				  if (err){
					  console.log(err)
					  console.log("Error update currency rate data")
				  }
			  })
			});
		if(isInsertChartData){
			var arr = []
			tokenKeys.forEach(key => {
			  var address = key
			  var token = new Token({
				address:address,
				name:tokenPrice[key].symbol,
				price:tokenPrice[key].price
			  })
			  arr.push(token)
			});
			Token.insertMany(arr)
		}	

	  }else{
		  console.log("ERROR!!!")
	  }
  });
	
  }
  
  
  module.exports = {
	insertCexPrice:insertCexPrice,
	insertTokenInfo:insertTokenInfo,
	getKlayswapTokenInfo:getKlayswapTokenInfo
  }