const axios = require('axios')

// search top holder
const searchHolders = async function(tokenInfo) {
  result = {
    tokenAddress: tokenInfo.address,
    symbol: tokenInfo.symbol,
    name: tokenInfo.name,
    decimal: tokenInfo.decimals,
    hoders: []
  }
  pages = 1 // Top 20*pages
  for (let i = 0; i < pages; i++) {
    await axios.get("https://api-cypress.scope.klaytn.com/v1/tokens/"+tokenInfo.address+"/holders?page="+(i+1))
      .then(response => {
        accountList = response.data.result
        for (let i = 0; i < accountList.length; i++) {
          const account = accountList[i];
          result.hoders.push({
            address: account.address,
            balance: parseInt(account.amountHeld) / 10**(tokenInfo.decimals)
          })
        }
    })
  }
  return result
}


module.exports = {
  searchHolders
}