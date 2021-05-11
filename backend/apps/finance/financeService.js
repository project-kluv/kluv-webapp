const axios = require('axios');
const fs = require('fs');
const Caver = require('caver-js-ext-kas');
const contractService = require('../contract/contractService')

const getAllLPPool = function(swapName, callbak){
  console.log("[service] ------> getTokenPriceAll")
  try {
    if (swapName === 'klayswap') {
      const tokenInfo = JSON.parse(fs.readFileSync("./apps/finance/klayswapTokenInfo.json", 'utf8'));
      
      params = {"swapName":swapName, "contractName": "FACTORY_VIEW", "method":"getFullData"}
      contractService.callContract(params, function(callResult){
        const fullData = callResult['response']
        const poolCount = Number(fullData['poolCount'])
        const fixedDatas = fullData['fixedDatas']
        const amountDatas = fullData['amountDatas']
        const decimalDatas = fullData['decimalDatas']
        
        result = {data: []};
        for (let i = 0; i < poolCount; i++) {        
          const lpToken = fixedDatas[i]
          const tokenA = fixedDatas[poolCount+i]
          const tokenB = fixedDatas[(2*poolCount+i)]
          
          // klayswapTokenInfo.json 파일의 토큰 주소가 소문자로 되어있음
          if ((tokenInfo[tokenA.toLowerCase()] != null) & (tokenInfo[tokenB.toLowerCase()] != null)) {
            result.data.push({
              "address": lpToken,
              "totalSupply": amountDatas[i],
              "decimals":decimalDatas[i],
              "tokenA": tokenA,
              "tokenB": tokenB,
              "tokenAAmount": amountDatas[poolCount+i],
              "tokenBAmount": amountDatas[(2*poolCount+i)], 
              "tokenADecimals": tokenInfo[fixedDatas[poolCount+i].toLowerCase()]['decimals'],
              "tokenBDecimals": tokenInfo[fixedDatas[(2*poolCount)+i].toLowerCase()]['decimals']
            })
          } else {
            console.log(lpToken + " 의 구성 토큰의 정보가 부족합니다.")
            // 구성 토큰 기본정보 추가 해야함
          }
        }
        callbak({success : true , response: result})
      })
    } else throw new Error("거래소 설정이 잘못되었습니다")
  } catch (error) {
    callbak({success : false , message: error.message})
  }
};

const getAllTokenPrice = function(swapName, callbak){
  console.log("[service] ------> getAllTokenPrice")
  try {
    tokenPriceAll={}
    this.getAllLPPool(swapName, function(callResult){
      const lpPools = callResult['response'].data;
      if(swapName === 'klayswap'){
        const tokenInfo = JSON.parse(fs.readFileSync("./apps/finance/klayswapTokenInfo.json", 'utf8'));
        for (const tokenAddress in tokenInfo) {
          if (Object.hasOwnProperty.call(tokenInfo, tokenAddress)) {
            tokenPriceAll[tokenAddress] = tokenAddress == '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167' ? 1 : 0;
          }
        }
        // LP 풀로 계산하는 로직 작성중 
        calcTokenPrice(lpPools, '0x0000000000000000000000000000000000000000')
      }
      


      callbak({success : true , response: tokenPriceAll})
    });
  } catch (error) {
    callbak({success : false , message: error.message})
  }
  
  function calcTokenPrice(lpPools, standardAddress){
    const pairs = lpPools.filter(function(obj){
      condA = obj.tokenA == standardAddress;
      condB = obj.tokenB == standardAddress;
      return condA || condB
    });
    for (let i = 0; i < pairs.length; i++) {
      const lp = pairs[i];
      if(lp.tokenA == standardAddress) {
        standardAmount = lp.tokenAAmount/(10**lp.tokenADecimals)
        tokenAmount = lp.tokenBAmount/(10**lp.tokenBDecimals)
      } else {
        standardAmount = lp.tokenBAmount/(10**lp.tokenBDecimals)
        tokenAmount = lp.tokenAAmount/(10**lp.tokenADecimals)
      }
      // 계산 로직 작성해야함

    }
  }
}

module.exports = {
  getAllLPPool:getAllLPPool,
  getAllTokenPrice:getAllTokenPrice
}