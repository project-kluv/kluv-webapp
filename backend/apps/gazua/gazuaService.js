const cexUtils = require('../../utils/cexUtils')
const poolService = require('../pool/poolService')


const searchOpportunity = async function(threshold=0.02) {
  const premiumList = await this.getOpportunity()
  let opporTunity = []
  for (let i = 0; i < premiumList.length; i++) {
    const sellTarget = premiumList[i];
    for (let j = 0; j < premiumList.length; j++) {
      const buyTarget = premiumList[j];
      if (sellTarget.symbol != buyTarget.symbol & (sellTarget.sellPremium - buyTarget.buyPremium > threshold)) {
        opporTunity.push({
          buySymbol : buyTarget.symbol,
          buyExchange : buyTarget.exchange,
          sellSymbol : sellTarget.symbol,
          sellExchange : sellTarget.exchange,
          premiumGap : sellTarget.sellPremium - buyTarget.buyPremium
        })
      }
    }
  }
  return opporTunity
}


const getOpportunity = async function() {
  const targetToken = {
    swap:['KLAY', 'SSX', 'KXRP'], 
    upbit:['SSX', 'XRP'],
    bithumb:['KLAY', 'SSX', 'XRP'],
    coinone:['KLAY', 'XRP'],
  }
  const cexList = ['upbit','bithumb','coinone']
  let currency = await cexUtils.getCurrency('usdkrw') // 환율 가져오기
  // 클레이스왑 기준가격 
  let klayswapPrice = []
  await poolService.getAllTokenPrice('klayswap', function(appPrice) {
    tokenPrice = appPrice.response.token
    for (const address in tokenPrice) {
      if (Object.hasOwnProperty.call(tokenPrice, address)) {
        const tokenInfo = tokenPrice[address];
        if (targetToken.swap.includes(tokenInfo['symbol'])){
          klayswapPrice.push({
            symbol: tokenInfo['symbol'] == 'KXRP' ? 'XRP' : tokenInfo['symbol'],
            price: tokenInfo['price'] * currency.data.price
          })
        }
      }
    }
  })
  // CEX 오더북 가져오기
  let cexOrderbook = []
  for (let j = 0; j < cexList.length; j++) {
    for (let index = 0; index < targetToken[cexList[j]].length; index++) {
    const symbol = targetToken[cexList[j]][index];
      cexOrderbookInfo = await cexUtils.getCexOrderbook(cexList[j], symbol, 'KRW')
      if (cexOrderbookInfo.success){
        cexOrderbook.push({
          cex: cexList[j],
          symbol: symbol,
          sellPrice: cexOrderbookInfo.data.sell,
          buyPrice: cexOrderbookInfo.data.buy
        })
      }
    }
  }
  // 매수 프리미엄 계산
  let premiumList = []
  for (let i = 0; i < klayswapPrice.length; i++) {
    const swapPrice = klayswapPrice[i];
    for (let j = 0; j < cexOrderbook.length; j++) {
      const cexPrice = cexOrderbook[j];
      if (swapPrice.symbol === cexPrice.symbol) {
        buyPremium = cexUtils.calcSwapKimp(cexPrice.sellPrice, swapPrice.price)
        sellPremium = cexUtils.calcSwapKimp(cexPrice.buyPrice, swapPrice.price)
        premiumList.push({
          symbol : swapPrice.symbol,
          exchange : "KLAYSWAP-" + cexPrice.cex.toUpperCase(),
          buyPremium : buyPremium,
          sellPremium : sellPremium
        })
      }
    }
  }
  return premiumList
}

const getSwapKimpAll = function () {
  
}

module.exports = {
  getOpportunity,
  searchOpportunity,
  getSwapKimpAll
}