const axios = require('axios')
const xmlhttp = require('xmlhttprequest')



// 1. get Currency
async function getCurrency(currency) {
	// let rtn = {success : true, data : {price : 1130 }}
	const currencyURL = "https://earthquake.kr:23490/query/"+currency
	await axios.get(currencyURL)
		.then(response => {
			rtn = {success : true, data : {price : response.data.usdkrw[0] } }
		})
		.catch(error => { 
			rtn = {success: false, message: error.message}
		});
	if (!rtn.success) {
		await axios.get("https://api.manana.kr/exchange/rate.json")
		.then(response => {
			rtn = {success : true, data : {price : response.data[1].rate } }
		})
		.catch(error => { 
			rtn = {success: false, message: error.message}
		});
	}
	return rtn;
}

// 2. get CexPrice
async function getCexPrice(cex, symbol, payment) {
	// let coinPrice = { symbol = '', sell = 0, buy = 0, precent = 0 }
	let rtn = { success: true, data: { "exchange": cex, "market": payment, "symbol": symbol, "price": 0 } }
	let cexPriceURL = ''
	try {
		if (cex === 'upbit') {
			cexPriceURL = 'https://api.upbit.com/v1/ticker?markets='+payment+'-'+symbol
			await axios.get(cexPriceURL)
			.then(response => {
				rtn.data.price = response.data[0].trade_price
			})
		} else if (cex === 'bithumb') {
			cexPriceURL = 'https://api.bithumb.com/public/ticker/'+symbol+'_'+payment
			await axios.get(cexPriceURL)
			.then(response => {
				rtn.data.price = response.data.data.closing_price
			})
		} else if (cex === 'coinone') {
			cexPriceURL =  'https://api.coinone.co.kr/ticker/?currency='+symbol
			await axios.get(cexPriceURL)
			.then(response => {
				rtn.data.price = response.data.last
			})
		} else if (cex === 'binance') {
			cexPriceURL = 'https://api.binance.com/api/v3/ticker/price?symbol='+symbol+payment
			await axios.get(cexPriceURL)
			.then(response => {
				rtn.data.price = response.data.price
			})
		}
	} catch(error) {
		rtn = {success: false, message: error.message}
	}
	return rtn
}

function calcSwapKimp(cexPrice, swapPrice) {
	return cexPrice/swapPrice-1
}


// 3. get CexOrderbook
async function getCexOrderbook(cex, symbol, payment) {
	let rtn = { success: true, data: { "exchange": cex, "market": payment, "symbol": symbol, "sell": 0, "buy": 0 } }
	let cexOrderbookURL = ''
	try {
		if (cex === 'upbit') {
			cexOrderbookURL = 'https://api.upbit.com/v1/orderbook/?markets='+payment+'-'+symbol
			await axios.get(cexOrderbookURL)
			.then(response => {
				if (response.data.length > 0){
					rtn.data.sell = response.data[0].orderbook_units[0].ask_price
					rtn.data.buy = response.data[0].orderbook_units[0].bid_price
				}
			})
		} else if (cex === 'bithumb') {
			cexOrderbookURL = 'https://api.bithumb.com/public/orderbook/'+symbol+'_'+ payment
			await axios.get(cexOrderbookURL)
			.then(response => {
				rtn.data.sell = parseFloat(response.data.data.asks[0].price)
				rtn.data.buy = parseFloat(response.data.data.bids[0].price)
			})
		} else if (cex === 'coinone') {
			cexOrderbookURL = 'https://api.coinone.co.kr/orderbook/?currency='+symbol
			await axios.get(cexOrderbookURL)
			.then(response => {
				rtn.data.sell = parseFloat(response.data.ask[0].price)
				rtn.data.buy = parseFloat(response.data.bid[0].price)
			})
		} else if (cex === 'binance') {
			cexOrderbookURL = 'https://api.binance.com/api/v3/ticker/bookTicker?symbol='+symbol+payment
			await axios.get(cexOrderbookURL)
			.then(response => {
				rtn.data.sell = response.data.askPrice
				rtn.data.buy = response.data.bidPrice
			})
		}
		
	} catch (error) {
		rtn = {success: false, message: error.message}
	}
	return rtn
}








//환율
function getUsdkrw(callback) {
	axios.get("https://earthquake.kr:23490/query/usdkrw")
		.then(response => {
			callback(response.data.usdkrw[0])
		})
		.catch(error => {
			callback({
				success: false,
				message: error.message
			})
		});
}

//환율
async function getUsdkrw2() {
	let rtn = '';
	await axios.get("https://earthquake.kr:23490/query/usdkrw")
		.then(response => {
			rtn = response.data.usdkrw[0]
		})
		.catch(error => {
			rtn = {
				success: false,
				message: error.message
			}
		});
	return rtn;
}


//환율
function getUsdkrw3() {
	var request = new xmlhttp.XMLHttpRequest();
	request.open('GET', 'https://earthquake.kr:23490/query/usdkrw', false); // `false` makes the request synchronous
	request.send(null)
	let rtn = 0;
	if (request.status === 200) {
		return JSON.parse(request.responseText).usdkrw[0]
	}
}


module.exports = {
	getCurrency,
	getCexPrice,
	getCexOrderbook,
	calcSwapKimp,
	getUsdkrw: getUsdkrw,
	getUsdkrw2: getUsdkrw2,
	getUsdkrw3: getUsdkrw3,
};