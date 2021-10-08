const axios = require('axios');
const poolModel = require('./poolModels.js')
const utils = require('../../utils/commonUtils.js')


const getAllLPPool = async function(appName, authName){
  // console.log("[service] ------> getAllLPPool")
  try {
    if (appName === 'klayswap') {
      const tokenInfo = poolModel.getTokenInfo(appName)
      const lpTokenInfo = poolModel.getLPTokenInfo(appName)

      const factoryViewContract = utils.getContract(appName, "FACTORY_VIEW", authName)
      const fullData = await factoryViewContract.methods.getFullData().call()
      
      const poolCount = Number(fullData['poolCount'])
      const fixedDatas = fullData['fixedDatas']
      const amountDatas = fullData['amountDatas']
      const decimalDatas = fullData['decimalDatas']

      let newLPAddress = []
      let newLPSymbol = []
      let newLPName = []
      let newLPDecimals = []

      let newTokenAddress = []
      let newTokenSymbol = []
      let newTokenName = []
      let newTokenDecimals = []
      
      for (let index = 0; index < fixedDatas.length; index++) {
        const element = fixedDatas[index];
        // LP토큰 정보가 없는 경우 업데이트 해줌
        if (index < poolCount) {
          if (lpTokenInfo[element] == null) {
            let newTokenInfo = await utils.getNewTokenInfo(element, authName)

            newLPAddress.push(element)
            newLPSymbol.push(newTokenInfo.symbol)
            newLPName.push(newTokenInfo.name)
            newLPDecimals.push(newTokenInfo.decimals)
            lpTokenInfo[element] = {
              "symbol": newTokenInfo.symbol,
              "name": newTokenInfo.name,
              "decimals": newTokenInfo.decimals
            }
            // poolModel.addLPTokenInfo(appName, [element, newTokenInfo.symbol, newTokenInfo.name, newTokenInfo.decimals])
          }
          // LP를 구성하는 토큰 정보가 없는 경우 업데이트 해줌
        } else {
          if (tokenInfo[element] == null) {
            let newTokenInfo = await utils.getNewTokenInfo(element, authName)

            newTokenAddress.push(element)
            newTokenSymbol.push(newTokenInfo.symbol)
            newTokenName.push(newTokenInfo.name)
            newTokenDecimals.push(newTokenInfo.decimals)
            tokenInfo[element] = {
              "symbol": newTokenInfo.symbol,
              "name": newTokenInfo.name,
              "decimals": newTokenInfo.decimals
            }
            // poolModel.addTokenInfo(appName, [element, newTokenInfo.symbol, newTokenInfo.name, newTokenInfo.decimals])
          }
        }
      }
      if ( newLPAddress.length > 0 ) poolModel.addLPTokenInfo(appName, [newLPAddress, newLPSymbol, newLPName, newLPDecimals])
      if ( newTokenAddress.length > 0 ) poolModel.addTokenInfo(appName, [newTokenAddress, newTokenSymbol, newTokenName, newTokenDecimals])

      result = {data: []};
      for (let i = 0; i < poolCount; i++) {        
        const lpToken = fixedDatas[i]
        const tokenA = fixedDatas[poolCount+i]
        const tokenB = fixedDatas[(2*poolCount+i)]

        result.data.push({
          "address": lpToken,
          "name": lpTokenInfo[fixedDatas[i]]['name'],
          "totalSupply": amountDatas[i],
          "decimals":decimalDatas[i],
          "tokenA": tokenA,
          "tokenB": tokenB,
          "tokenAAmount": amountDatas[poolCount+i],
          "tokenBAmount": amountDatas[(2*poolCount+i)], 
          "tokenAName": tokenInfo[fixedDatas[poolCount+i]]['name'],
          "tokenBName": tokenInfo[fixedDatas[(2 * poolCount) + i]]['name'],
          "tokenASymbol": tokenInfo[fixedDatas[poolCount+i]]['symbol'],
          "tokenBSymbol": tokenInfo[fixedDatas[(2*poolCount)+i]]['symbol'],
          "tokenADecimals": Number(tokenInfo[fixedDatas[poolCount+i]]['decimals']),
          "tokenBDecimals": Number(tokenInfo[fixedDatas[(2*poolCount)+i]]['decimals'])
        })
      }
      return result
    } else return 0
  } catch (error) {
    console.log(error.message)
  }
};

const getAllTokenPrice = async function (appName, authName, callbak){
  // console.log("[service] ------> getAllTokenPrice")
  try{
    const lpPools = await this.getAllLPPool(appName, authName)
    const tokenPriceAll = this.getTokenPriceInApp(appName, lpPools)
    
    callbak({success : true , response: tokenPriceAll})
  } catch (error) {
    callbak({success : false , message: error.message})
  }
}

const getTokenPriceInApp = function (appName, lpPools) {
  allTokenPriceInApp ={token:{}, lp:{}}
  const tokenInfo = poolModel.getTokenInfo(appName)
  const currentTime = new Date()

  for (const tokenAddress in tokenInfo) {
    if (Object.hasOwnProperty.call(tokenInfo, tokenAddress)) {
      allTokenPriceInApp.token[tokenAddress] = {
        decimals : tokenInfo[tokenAddress].decimals,
        name : tokenInfo[tokenAddress].name,
        symbol: tokenInfo[tokenAddress].symbol,
        datetime : currentTime.toISOString(),
        price : 0
      }
    }
  }
  // 1. get price using USDT pair : 0xcee8faf64bb97a73bb51e115aa89c17ffa8dd167
  allTokenPriceInApp.token['0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167'].price = 1
  calcTokenPrice(lpPools['data'], '0xceE8FAF64bB97a73bb51E115Aa89C17FfA8dD167')
  // 2. get pirce using klay pair : 0x0000000000000000000000000000000000000000
  calcTokenPrice(lpPools['data'], '0x0000000000000000000000000000000000000000')
    // 3. get price using others.
  calcTokenPrice(lpPools['data'], '0x588C62eD9aa7367d7cd9C2A9aaAc77e44fe8221B'); // Agov -> HINT
  calcTokenPrice(lpPools['data'], '0x34d21b1e550D73cee41151c77F3c73359527a396'); // KETH -> KICX
  calcTokenPrice(lpPools['data'], '0x158BeFF8C8cDEbD64654ADD5F6A1d9937e73536c'); // HOUSE -> WOOD
  calcTokenPrice(lpPools['data'], '0xe950bdcFa4d1e45472E76cf967Db93dBfc51Ba3E'); // KAI -> 합성자산
  

  // get LP price
  for (let i = 0; i < lpPools['data'].length; i++) {
    const lpPool = lpPools['data'][i];
    tokenAUnit = lpPool.tokenAAmount/lpPool.totalSupply
    tokenBUnit = lpPool.tokenBAmount/lpPool.totalSupply
    
    allTokenPriceInApp.lp[lpPool.address] = {
      "totalSupply": lpPool.totalSupply,
      "name": lpPool.name,
      "tokenA": lpPool.tokenA,
      "tokenB": lpPool.tokenB,
      "tokenAName": lpPool.tokenAName,
      "tokenBName": lpPool.tokenBName,
      "tokenASymbol": lpPool.tokenASymbol,
      "tokenBSymbol": lpPool.tokenBSymbol,
      "tokenAUnit": tokenAUnit,
      "tokenBUnit": tokenBUnit,
      "price": tokenAUnit*(10**lpPool.decimals/10**lpPool.tokenADecimals)*allTokenPriceInApp.token[lpPool.tokenA].price + 
              tokenBUnit*(10**lpPool.decimals/10**lpPool.tokenBDecimals)*allTokenPriceInApp.token[lpPool.tokenB].price,
      "decimals": Number(lpPool.decimals)
    }
  }
  return allTokenPriceInApp

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
        price = allTokenPriceInApp.token[standardAddress].price * standardAmount/tokenAmount
      }
      allTokenPriceInApp.token[tokenAddress].price = allTokenPriceInApp.token[tokenAddress].price == 0 ? price : allTokenPriceInApp.token[tokenAddress].price;
    }
  }
}





module.exports = {
  getAllLPPool:getAllLPPool,
  getAllTokenPrice:getAllTokenPrice,
  getTokenPriceInApp: getTokenPriceInApp
}