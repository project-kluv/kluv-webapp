const axios = require('axios');
const fs = require('fs');
const Caver = require('caver-js-ext-kas');
const contractService = require('../contract/contractService')

const getAllLPPool = function(swapName, callbak){
  console.log("[service] ------> getTokenPriceAll")
  try {
    const tokenInfo = JSON.parse(fs.readFileSync("./apps/finance/tokenInfo.json", 'utf8'));

    if (swapName === 'klayswap') {
      params = {"swapName":swapName, "contractName": "FACTORY_VIEW", "method":"getFullData"}
      contractService.callContract(params, function(callResult){
        const fullData = callResult['response']
        const poolCount = Number(fullData['poolCount'])
        const fixedDatas = fullData['fixedDatas']
        const amountDatas = fullData['amountDatas']
        const decimalDatas = fullData['decimalDatas']
        
        result = {};
        for (let i = 0; i < poolCount; i++) {        
          const lpToken = fixedDatas[i]
          const tokenA = fixedDatas[poolCount+i]
          const tokenB = fixedDatas[(2*poolCount+i)]
          
          // tokenInfo.json 파일의 토큰 주소가 소문자로 되어있음
          if ((tokenInfo[tokenA.toLowerCase()] != null) & (tokenInfo[tokenB.toLowerCase()] != null)) {
            result[lpToken] = {
              "totalSupply": amountDatas[i],
              "decimals":decimalDatas[i],
              "tokenA": tokenA,
              "tokenB": tokenB,
              "tokenAAmount": amountDatas[poolCount+i],
              "tokenBAmount": amountDatas[(2*poolCount+i)], 
              "tokenADecimals": tokenInfo[fixedDatas[poolCount+i].toLowerCase()]['decimals'],
              "tokenBDecimals": tokenInfo[fixedDatas[(2*poolCount)+i].toLowerCase()]['decimals']
            }
          } else {
            console.log(lpToken + " 의 구성 토큰의 정보가 부족합니다.")
            // 구성 토큰 기본정보 추가 해야함
          }
        }
        callbak({success : true , message: result})
      })
    } else throw new Error("거래소 설정이 잘못되었습니다")
  } catch (error) {
    callbak({success : false , message: error.message})
  }
};


module.exports = {
  getAllLPPool:getAllLPPool
}