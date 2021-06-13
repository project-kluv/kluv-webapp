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
  console.log("[service] ------> getExpectedLPReturnInApp")
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
    totalUsdt = unitPrice*totalSupply/10**decimals

    poolVotingInfo['tokenA'] = lpPrice[poolVotingInfo.pools].tokenA
    poolVotingInfo['tokenB'] = lpPrice[poolVotingInfo.pools].tokenB
    poolVotingInfo['totalUsdt'] = totalUsdt
    poolVotingInfo['curReward'] = DAILY_DISTRIBUTION * poolVotingInfo['curRates']
    poolVotingInfo['curRewardUsdt'] = rewardPrice * DAILY_DISTRIBUTION * poolVotingInfo['curRates']
    poolVotingInfo['curApr'] = (365 * rewardPrice * DAILY_DISTRIBUTION * poolVotingInfo['curRates']) / totalUsdt
    
    poolVotingInfo['nextReward'] = DAILY_DISTRIBUTION * poolVotingInfo['nextRates']
    poolVotingInfo['nextRewardUsdt'] = rewardPrice * DAILY_DISTRIBUTION * poolVotingInfo['nextRates']
    poolVotingInfo['nextApr'] = (365 * rewardPrice * DAILY_DISTRIBUTION * poolVotingInfo['nextRates']) / totalUsdt
  }
  return poolVotingInfoList
}

module.exports = {
  getExpectedLPReturn: getExpectedLPReturn,
  getExpectedLPReturnInApp: getExpectedLPReturnInApp
}