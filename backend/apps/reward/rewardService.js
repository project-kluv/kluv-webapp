const axios = require('axios');
const utils = require('../../utils/commonUtils.js')
const poolService = require('../pool/poolService')


const getExpectedLPReturn = async function (appName, callbak) {
  console.log("[service] ------> getExpectedLPReturn")
  try {
    KSP_DAILY_AMOUNT = 86400
    // 1. pool별 KSP 분배율 계산
    const poolVotingInfoList = await getPoolVotingInfo(appName)

    // 2. pool별 평가금액 계산
    poolService.getAllTokenPrice(appName, function (callResult) {
      const lpPrice = callResult['response']['lp']
      const kspPrice = callResult['response']['token']['0xC6a2Ad8cC6e4A7E08FC37cC5954be07d499E7654']

      for (let i = 0; i < poolVotingInfoList.length; i++) {
        let poolVotingInfo = poolVotingInfoList[i];
        totalSupply = lpPrice[poolVotingInfo.pools].totalSupply
        decimals = lpPrice[poolVotingInfo.pools].decimals
        unitPrice = lpPrice[poolVotingInfo.pools].price
        
        console.log("total price : " + unitPrice*totalSupply/10**decimals)
        poolVotingInfo['curKSP'] = KSP_DAILY_AMOUNT * poolVotingInfo['curRates']
      }






      callbak({ success: true, response: poolVotingInfoList })
    })
  } catch (error) {
    callbak({success : false , message: error.message})
  }
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
  getExpectedLPReturn: getExpectedLPReturn
}