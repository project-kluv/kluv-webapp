const axios = require('axios')
const poolService = require('../pool/poolService.js')
const utils = require('../../utils/commonUtils.js')


const getBalance = function(account, callbak) {
	console.log("[service] ------> getAccountBalance")
  try {
    // 1. KLAYSWAP LP + 토큰 잔고 가져오기 -> 함수화 시켜야함 
    const exchangeList = ['klayswap'] // 거래소 목록 
    if (exchangeList[0] === 'klayswap') {
      poolService.getAllTokenPrice(exchangeList[0], async function(callResult){
        const lpPrice = callResult['response']['lp']
				const tokenPrice = callResult['response']['token']
				
				const lpAddressList = Object.keys(lpPrice)
				const tokenAddressList = Object.keys(tokenPrice)
				const allAddressList = lpAddressList.concat(tokenAddressList)

        const balanceBookContract = utils.getContract(exchangeList[0] , "BALANCE_BOOK")
        const balances = await balanceBookContract.methods.balanceOf(account, allAddressList).call()
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
        } else throw new Error("요청한 건수와 결과 건수가 다릅니다")
        callbak({success : true , response: result})
      })
      // 2. KSP Pending Rewards 가져오기 -> 함수화 시켜야함 


    } else throw new Error("거래소 목록 오류")
  } catch (error) {
    callbak({success : false , message: error.message})
  }
}

const getPendingRewards = function(appName, lpAddress, account) {
  try {
    if (appName === 'klayswap') {
      
      
      result = ""
      callbak({success : true , response: result})
    } else throw new Error("거래소 목록 오류")
  } catch (error) {
    callbak({success : false , message: error.message})
  }
}




module.exports = {
	getBalance: getBalance,
  getPendingRewards:getPendingRewards
};