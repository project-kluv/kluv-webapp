const axios = require('axios');
const utils = require('../../utils/commonUtils.js')
const poolService = require('../pool/poolService')


const getExpectedLPReturn = async function (appName, callbak) {
  console.log("[service] ------> getExpectedLPReturn")
  try {
    poolVotingInfoList = await this.getExpectedLPReturnInApp(appName)

    callbak({ success: true, response: poolVotingInfoList })
  } catch (error) {
    callbak({success : false , message: error.message})
  }
}

const getExpectedLPReturnInApp = async function (appName) {
  const poolVotingInfoList = await getPoolVotingInfo(appName)
  const lpPools = await poolService.getAllLPPool(appName)
  const tokenPriceAll = poolService.getTokenPriceInApp(appName, lpPools)
  const lpPrice = tokenPriceAll['lp']
  
  if (appName === "klayswap") {
    DAILY_DISTRIBUTION = 86400
    rewardPrice = tokenPriceAll['token']['0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654']['price']
  } else {
    DAILY_DISTRIBUTION = 0
    rewardPrice = 0
  }

  for (let i = 0; i < poolVotingInfoList.length; i++) {
    let poolVotingInfo = poolVotingInfoList[i];
    totalSupply = lpPrice[poolVotingInfo.pools].totalSupply
    decimals = lpPrice[poolVotingInfo.pools].decimals
    unitPrice = lpPrice[poolVotingInfo.pools].price
    totalUSDT = unitPrice*totalSupply/10**decimals

    poolVotingInfo['tokenA'] = lpPrice[poolVotingInfo.pools].tokenA
    poolVotingInfo['tokenB'] = lpPrice[poolVotingInfo.pools].tokenB
    poolVotingInfo['totalUSDT'] = totalUSDT
    poolVotingInfo['curReward'] = DAILY_DISTRIBUTION * poolVotingInfo['curRates']
    poolVotingInfo['curReward_USDT'] = rewardPrice * DAILY_DISTRIBUTION * poolVotingInfo['curRates']
    poolVotingInfo['apr'] = (365*rewardPrice * DAILY_DISTRIBUTION * poolVotingInfo['curRates']) / totalUSDT
  }
  return poolVotingInfoList
}


const getPoolVotingInfo = async function (appName) {
  const poolVotingViewContract = utils.getContract(appName, "POOL_VOTING_VIEW")
    const poolVotingData = await poolVotingViewContract.methods.getPoolVotingData().call()

    result = []
    const poolCount = poolVotingData.pools.length
    if (poolCount > 1) {
      for (let i = 0; i < poolCount; i++) {
        result.push({
          pools: poolVotingData.pools[i],
          prevAmounts: poolVotingData.prevAmounts[i],
          curAmounts: poolVotingData.curAmounts[i],
          curRates: poolVotingData.curRates[i]/10000,
          nextRates: poolVotingData.nextRates[i]/10000
        })
      }
    }
  return result
}

module.exports = {
  getExpectedLPReturn: getExpectedLPReturn,
  getExpectedLPReturnInApp: getExpectedLPReturnInApp
}