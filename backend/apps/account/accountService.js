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
						// lpBalance = balances.slice(0, lpAddressList.length)
						// tokenBalance = balances.slice(lpAddressList.length)
						result = {address:[], balanceAll:[], balanceAllUSDT:[], balanceToken:[], balanceTokenUSDT:[], totalUSDT:[]}
						for (let i = 0; i < balances.length; i++) {
							result.address.push(allAddressList[i])
							if (i < lpAddressList.length) {
								balance = balances[i] / 10**lpPrice[allAddressList[i]].decimals
								result.balanceAll.push(balance)
								result.balanceAllUSDT.push(balance * lpPrice[allAddressList[i]].price)
							} else {
								balance = balances[i] / 10**tokenPrice[allAddressList[i]].decimals
								result.balanceAll.push(balance)
								result.balanceAllUSDT.push(balance * tokenPrice[allAddressList[i]].price)
							}
						}
						result.totalUSDT.push(arrSum(result.balanceAllUSDT))
						callbak({success : true , response: result})
					} else throw new Error("요청한 건수와 결과 건수가 다릅니다")
				})
      })
    } else throw new Error("거래소 설정이 잘못되었습니다")
  } catch (error) {
    callbak({success : false , message: error.message})
  }

	function arrSum(arr) {
		return arr.reduce(function (a,b){
			return a+b
		}, 0)
	}

	function calcLPtoToken(lpPrice, lpBalance){

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

