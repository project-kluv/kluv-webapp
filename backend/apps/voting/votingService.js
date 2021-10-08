const axios = require('axios');
const utils = require('../../utils/commonUtils.js')

const getPoolVotingInfo = async function (appName, authName) {
  // console.log("[service] ------> getPoolVotingInfo")
  const poolVotingViewContract = utils.getContract(appName, "POOL_VOTING_VIEW", authName)
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
  getPoolVotingInfo:getPoolVotingInfo
}