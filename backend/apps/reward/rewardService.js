const axios = require('axios');
const utils = require('../../utils/commonUtils.js')
const poolService = require('../pool/poolService')
const votingService = require('../voting/votingService')


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
  const poolVotingInfoList = await votingService.getPoolVotingInfo(appName)
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
    poolVotingInfo['curApr'] = (365 * rewardPrice * DAILY_DISTRIBUTION * poolVotingInfo['curRates']) / totalUSDT
    
    poolVotingInfo['nextReward'] = DAILY_DISTRIBUTION * poolVotingInfo['nextRates']
    poolVotingInfo['nextReward_USDT'] = rewardPrice * DAILY_DISTRIBUTION * poolVotingInfo['nextRates']
    poolVotingInfo['nextApr'] = (365 * rewardPrice * DAILY_DISTRIBUTION * poolVotingInfo['nextRates']) / totalUSDT
  }
  return poolVotingInfoList
}

module.exports = {
  getExpectedLPReturn: getExpectedLPReturn,
  getExpectedLPReturnInApp: getExpectedLPReturnInApp
}