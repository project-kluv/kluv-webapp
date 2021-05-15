const axios = require('axios')
const poolService = require('../pool/poolService.js')
const utils = require('../../utils/commonUtils.js')


const getBalance = async function(account, callbak) {
	console.log("[service] ------> getAccountBalance")
  try {
    // 1. KLAYSWAP LP + 토큰 잔고 가져오기 -> 함수화 시켜야함 
    const exchangeList = ['klayswap'] // 거래소 목록
    const appName = exchangeList[0]
    if (appName === 'klayswap') {
      const lpPools = await poolService.getAllLPPool(appName)
      const tokenPriceAll = poolService.getTokenPriceInApp(appName, lpPools)

      const lpPrice = tokenPriceAll['lp']
      const tokenPrice = tokenPriceAll['token']
      
      const lpAddressList = Object.keys(lpPrice)
      const tokenAddressList = Object.keys(tokenPrice)
      const allAddressList = lpAddressList.concat(tokenAddressList)

      const balanceBookContract = utils.getContract(appName , "BALANCE_BOOK")
      let balances
      await balanceBookContract.methods.balanceOf(account, allAddressList).call()
        .then(response => {
          balances = response
        })
        .catch(error => {
          callbak({
            success: false,
            message: error.message
          })
        });
      if (allAddressList.length === balances.length) {
        resultAll = {lpBalance:[], tokenBalance:[], totalBalance:[], totalUSDT:0}
        result = {lpBalance:[], tokenBalance:[], totalBalance:[], totalUSDT:0, pendingRewards:{}}
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

        // 2. KSP Pending Rewards 가져오기 -> 함수화 시켜야함 
        pendingRewards = await this.getPendingLPRewards(appName, account)
        if (pendingRewards['KSP'].length > 0) {
          result.pendingRewards = pendingRewards
        }

      } else throw new Error("요청한 건수와 결과 건수가 다릅니다")
      
      callbak({success : true , response: result})
      
    } else throw new Error("거래소 목록 오류")
  } catch (error) {
    callbak({success : false , message: error.message})
  }
}

const getPendingLPRewards = async function (appName, account) {
  console.log("[service] ------> getPendingLPRewards")
  try {
    if (appName === 'klayswap') {
      let pendingLPReward = {'KSP':[], "voting":[]}
      const factoryViewContract = utils.getContract(appName, "FACTORY_VIEW")
      const fullData = await factoryViewContract.methods.getFullData().call()
      const poolCount = Number(fullData['poolCount'])
      const userData = await factoryViewContract.methods.getUserData(account, 0, poolCount).call()
      for (let index = 0; index < poolCount; index++) {
        c = fullData['mined'] // s.mined
        w = fullData['amountDatas'][index] // amountDatas
        A = fullData['miningDatas'][index] // miningData
        P = fullData['miningDatas'][poolCount+index] // miningData
        C = (fullData['miningDatas'][2+poolCount+index] ) * (100) / 10000
        r = (C * (P - c))/100
        miningIndex = Number(A) + ((r / 10 ** 18) / w)

        if (userData['0'][index] > 0) {
          balanceOf = userData['0'][index]
          userLastIndex = userData['2'][index]
          pendingKSP = balanceOf * (miningIndex - userLastIndex) / 10 ** (2 * 18)
          pendingLPReward['KSP'].push({
            "pool": fullData["fixedDatas"][index],
            "pendingRewards": pendingKSP
          })
        }
      }
      return pendingLPReward
    } else throw new Error("거래소 목록 오류")
  } catch (error) {
    console.log(error.message)
  }
}




module.exports = {
	getBalance: getBalance,
  getPendingLPRewards:getPendingLPRewards
};