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
          
          if ((tokenInfo[tokenA] != null) & (tokenInfo[tokenB] != null)) {
            result.data.push({
              "address": lpToken,
              "totalSupply": amountDatas[i],
              "decimals":decimalDatas[i],
              "tokenA": tokenA,
              "tokenB": tokenB,
              "tokenAAmount": amountDatas[poolCount+i],
              "tokenBAmount": amountDatas[(2*poolCount+i)], 
              "tokenADecimals": tokenInfo[fixedDatas[poolCount+i]]['decimals'],
              "tokenBDecimals": tokenInfo[fixedDatas[(2*poolCount)+i]]['decimals']
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
            tokenPriceAll[tokenAddress] = tokenAddress == '0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167' ? 1 : 0;
          }
        }
        // 1. get price using USDT pair : 0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167
        calcTokenPrice(lpPools, '0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167')
        // 2. get pirce using klay pair : 0x0000000000000000000000000000000000000000
        calcTokenPrice(lpPools, '0x0000000000000000000000000000000000000000')
        // 3. get price using others.
        calcTokenPrice(lpPools, '0x588C62eD9aa7367d7cd9C2A9aaAc77e44fe8221B'); // Agov
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
    console.log(pairs)
    for (let i = 0; i < pairs.length; i++) {
      const lp = pairs[i];
      
      if(lp.tokenA == standardAddress) {
        standardAmount = lp.tokenAAmount/(10**lp.tokenADecimals)
        tokenAmount = lp.tokenBAmount/(10**lp.tokenBDecimals)
        tokenAddress = lp.tokenB
      } else {
        standardAmount = lp.tokenBAmount/(10**lp.tokenBDecimals)
        tokenAmount = lp.tokenAAmount/(10**lp.tokenADecimals)
        tokenAddress = lp.tokenA
      }
      // 계산 로직 작성해야함
      if (standardAddress == '0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167'){
        price = Math.round(1000000 * standardAmount/tokenAmount) / 1000000
      } else{
        price = Math.round(1000000 * tokenPriceAll[standardAddress] * standardAmount/tokenAmount) / 1000000
      }
      tokenPriceAll[tokenAddress] = tokenPriceAll[tokenAddress] == 0 ? price : tokenPriceAll[tokenAddress];
    }
  }
}

module.exports = {
  getAllLPPool:getAllLPPool,
  getAllTokenPrice:getAllTokenPrice
}