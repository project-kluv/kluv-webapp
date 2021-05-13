const axios = require('axios');
const utils = require('../../utils/commonUtils.js')
const solver = require("javascript-lp-solver");
const poolService = require('../pool/poolService')
const rewardService = require('../reward/rewardService')
const balanceService = require('../balance/balanceService')


const getMaximizeReturn = async function ([account, appName], callbak) {
  console.log("[service] ------> getExpectedLPReturn")
  try {
    model = {
      "optimize": "apr",
      "opType": "max",
      "constraints": {},
      "variables": {}
    }
    // 토큰 수익률 가져오기
    const lpExpectedReturn = await rewardService.getExpectedLPReturnInApp(appName)
    console.log(lpExpectedReturn)
    // 토큰 가격 가져오기
    const lpPools = await poolService.getAllLPPool(appName)
    const tokenPriceAll = poolService.getTokenPriceInApp(appName, lpPools)

    for (let i = 0; i < lpExpectedReturn.length; i++) {
      const poolInfo = lpExpectedReturn[i]
      if (tokenPriceAll['lp'][poolInfo.pools].price > 0) {
        model['variables'][poolInfo.pools] = {}
        model['variables'][poolInfo.pools]["apr"] = poolInfo.apr != null ? poolInfo.apr : 0
        model['variables'][poolInfo.pools][poolInfo.tokenA] = 1 / tokenPriceAll['token'][poolInfo.tokenA].price / 2
        model['variables'][poolInfo.pools][poolInfo.tokenB] = 1 / tokenPriceAll['token'][poolInfo.tokenB].price / 2
        model['constraints'][poolInfo.tokenA] = {
          "max": 0
        }
        model['constraints'][poolInfo.tokenB] = {
          "max": 0
        }
      }
    }
    // 현재 잔고
    balanceService.getBalance(account, function (callResult) {
      const totalBalance = callResult["response"]["totalBalance"]
      for (let index = 0; index < totalBalance.length; index++) {
        const token = totalBalance[index];
        model['constraints'][token.address]["max"] = token.balance
      }
      optims = solver.Solve(model);

      result = {"portion":{}, "expectedReturn":optims["result"]/callResult["response"]["totalUSDT"]}
      for (const lpAddress in tokenPriceAll['lp']) {
        if (Object.hasOwnProperty.call(tokenPriceAll['lp'], lpAddress)) {
          const lpPool = tokenPriceAll['lp'][lpAddress];
          const optimsLp = optims[lpAddress]

          if (optimsLp != null){
            result["portion"][lpAddress] = {
              "tokenA": lpPool.tokenA,
              "tokenB": lpPool.tokenB,
              "tokenAName" : tokenPriceAll['token'][lpPool.tokenA].name,
              "tokenBName" : tokenPriceAll['token'][lpPool.tokenB].name,
              "tokenAAmount": (optimsLp/2)/tokenPriceAll['token'][lpPool.tokenA].price,
              "tokenBAmount": (optimsLp/2)/tokenPriceAll['token'][lpPool.tokenB].price
            }
          }
        }
      }
      callbak({success: true,response: result})
    })

  } catch (error) {
    callbak({success: false,message: error.message})
  }
}


module.exports = {
  getMaximizeReturn: getMaximizeReturn
}