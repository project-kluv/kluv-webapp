const axios = require('axios')
const contractService = require('../contract/contractService')
const financeService = require('../finance/financeService')

const getAccountBalance = function(account, callbak) {
	console.log("[service] ------> getAccountBalance")
	try {
		const exchangeList = ['klayswap'] // 거래소 목록 

    if (exchangeList[0] === 'klayswap') {
      financeService.getAllTokenPrice(exchangeList[0], function(callResult){
				const lpPrice = callResult['response']['lp']
				const tokenPrice = callResult['response']['token']
				
				const lpAddressList = Object.keys(lpPrice)
				const tokenAddressList = Object.keys(tokenPrice)
				const allAddressList = lpAddressList.concat(tokenAddressList)
				
				params = {
					"swapName":exchangeList[0], 
					"contractName": "BALANCE_BOOK", 
					"method":"balanceOf",
					"variables": [account, allAddressList]
				}
				contractService.callContract(params, function(callContractRst){
					const balances = callContractRst['response']
					if (allAddressList.length === balances.length) {
						resultAll = {lpBalance:[], tokenBalance:[], totalBalance:[], totalUSDT:0}
						result = {lpBalance:[], tokenBalance:[], totalBalance:[], totalUSDT:0}
						for (let i = 0; i < balances.length; i++) {
							if (i < lpAddressList.length) {
								lpPriceInfo = lpPrice[allAddressList[i]]
								lpBalance = Number(balances[i])
								resultAll.lpBalance.push({
									"address": allAddressList[i],
									"balance": lpBalance / 10**lpPriceInfo.decimals,
									"tokenA": {
										"address": lpPriceInfo.tokenA,
										"balance": lpBalance*lpPriceInfo.tokenAUnit / 10**tokenPrice[lpPriceInfo.tokenA].decimals,
									},
									"tokenB": {
										"address": lpPriceInfo.tokenB,
										"balance": lpBalance*lpPriceInfo.tokenBUnit / 10**tokenPrice[lpPriceInfo.tokenB].decimals,
									},
									"priceUSDT": lpPriceInfo.price * lpBalance / 10**lpPriceInfo.decimals
								})
								resultAll.totalUSDT += lpPriceInfo.price * lpBalance / 10**lpPriceInfo.decimals
							} else {
								tokenPriceInfo = tokenPrice[allAddressList[i]]
								tokenBalance = Number(balances[i])
								resultAll.tokenBalance.push({
									"address": allAddressList[i],
									"name": tokenPriceInfo.name,
									"symbol": tokenPriceInfo.symbol,
									"balance": tokenBalance / 10**tokenPriceInfo.decimals,
									"priceUSDT": tokenPriceInfo.price * tokenBalance / 10**tokenPriceInfo.decimals
								})
								resultAll.totalUSDT += tokenPriceInfo.price * tokenBalance / 10**tokenPriceInfo.decimals

								// Balance Detail
								balanceSum = tokenBalance / 10**tokenPriceInfo.decimals
								searchTokenInLP = resultAll.lpBalance.filter(function(obj){
									return (obj.tokenA.address == allAddressList[i]) || (obj.tokenB.address == allAddressList[i]);
								})

								if (searchTokenInLP.length > 0){
									for (let j = 0; j < searchTokenInLP.length; j++) {
										const lpDetail = searchTokenInLP[j];
										if (lpDetail.tokenA.address == allAddressList[i]) balanceSum += lpDetail.tokenA.balance
										else balanceSum += lpDetail.tokenB.balance
									}
								}
								resultAll.totalBalance.push({
									"address": allAddressList[i],
									"name": tokenPriceInfo.name,
									"symbol": tokenPriceInfo.symbol,
									"balance": balanceSum,
									"priceUSDT": tokenPriceInfo.price * balanceSum
								})
							}
						}

						result.lpBalance = resultAll.lpBalance.filter(function(obj){ return obj.priceUSDT > 1 })
						result.tokenBalance = resultAll.tokenBalance.filter(function(obj){ return obj.priceUSDT > 1 })
						result.totalBalance = resultAll.totalBalance.filter(function(obj){ return obj.priceUSDT > 1 })
						result.totalUSDT = resultAll.totalUSDT

						callbak({success : true , response: result})
					} else throw new Error("요청한 건수와 결과 건수가 다릅니다")
				})
      })
    } else throw new Error("거래소 설정이 잘못되었습니다")
  } catch (error) {
    callbak({success : false , message: error.message})
  }
}

let getAccountFromExternal = function(account, callbak){
	
	console.log("[service] ------> getAccountInfo")

	axios.get("https://api-cypress.scope.klaytn.com/v1/accounts/"+ account)
		.then(response => {
			a= response.dat
				callbak({success : true , response: response.data})
		})
		.catch(error => {
				callbak({success : false , message: error.message})
		});
};

module.exports = {
	getAccountFromExternal: getAccountFromExternal,
	getAccountBalance: getAccountBalance
};

