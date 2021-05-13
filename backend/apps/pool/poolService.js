const axios = require('axios');
const poolModel = require('./poolModels.js')
const utils = require('../../utils/commonUtils.js')

const getAllLPPool = async function(appName){
  console.log("[service] ------> getAllLPPool")
  try {
    if (appName === 'klayswap') {
      const tokenInfo = poolModel.getTokenInfo(appName)
      const factoryViewContract = utils.getContract(appName, "FACTORY_VIEW")
      const fullData = await factoryViewContract.methods.getFullData().call()

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
            "tokenADecimals": Number(tokenInfo[fixedDatas[poolCount+i]]['decimals']),
            "tokenBDecimals": Number(tokenInfo[fixedDatas[(2*poolCount)+i]]['decimals'])
          })
        } else {
          console.log(lpToken + " 의 구성 토큰의 정보가 부족합니다(tokenA : "+tokenA+" / "+"tokenB : "+tokenB+")")
          // 구성 토큰 기본정보 추가 해야함
        }
      }
      return result
    } else return 0
  } catch (error) {
    console.log(error.message)
  }
};

const getAllTokenPrice = async function (appName, callbak){
  console.log("[service] ------> getAllTokenPrice")
  try{
    tokenPriceAll={token:{}, lp:{}}
    const lpPools = await this.getAllLPPool(appName)

    if(appName === 'klayswap'){
      const tokenInfo = poolModel.getTokenInfo(appName)
      for (const tokenAddress in tokenInfo) {
        if (Object.hasOwnProperty.call(tokenInfo, tokenAddress)) {
          tokenPriceAll.token[tokenAddress] = {
            decimals : tokenInfo[tokenAddress].decimals,
            name : tokenInfo[tokenAddress].name,
            symbol : tokenInfo[tokenAddress].symbol,
            price : 0
          }
        }
      }
      // 1. get price using USDT pair : 0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167
      tokenPriceAll.token['0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167'].price = 1
      calcTokenPrice(lpPools['data'], '0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167')
      // 2. get pirce using klay pair : 0x0000000000000000000000000000000000000000
      calcTokenPrice(lpPools['data'], '0x0000000000000000000000000000000000000000')
      // 3. get price using others.
      calcTokenPrice(lpPools['data'], '0x588C62eD9aa7367d7cd9C2A9aaAc77e44fe8221B'); // Agov
    }
    // get LP price
    for (let i = 0; i < lpPools['data'].length; i++) {
      const lpPool = lpPools['data'][i];
      tokenAUnit = lpPool.tokenAAmount/lpPool.totalSupply
      tokenBUnit = lpPool.tokenBAmount/lpPool.totalSupply
      
      tokenPriceAll.lp[lpPool.address] = {
        "totalSupply": lpPool.totalSupply,
        "tokenA": lpPool.tokenA,
        "tokenB": lpPool.tokenB,
        "tokenAUnit": tokenAUnit,
        "tokenBUnit": tokenBUnit,
        "price": tokenAUnit*(10**lpPool.decimals/10**lpPool.tokenADecimals)*tokenPriceAll.token[lpPool.tokenA].price + 
                tokenBUnit*(10**lpPool.decimals/10**lpPool.tokenBDecimals)*tokenPriceAll.token[lpPool.tokenB].price,
        "decimals": Number(lpPool.decimals)
      }
    }
    callbak({success : true , response: tokenPriceAll})
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
        tokenAddress = lp.tokenB
      } else {
        standardAmount = lp.tokenBAmount/(10**lp.tokenBDecimals)
        tokenAmount = lp.tokenAAmount/(10**lp.tokenADecimals)
        tokenAddress = lp.tokenA
      }
      
      if (standardAddress == '0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167'){
        price = standardAmount/tokenAmount
      } else{
        price = tokenPriceAll.token[standardAddress].price * standardAmount/tokenAmount
      }
      tokenPriceAll.token[tokenAddress].price = tokenPriceAll.token[tokenAddress].price == 0 ? price : tokenPriceAll.token[tokenAddress].price;
    }
  }
}

module.exports = {
  getAllLPPool:getAllLPPool,
  getAllTokenPrice:getAllTokenPrice
}