const axios = require('axios')

// search top holder
const searchHolders = async function(tokenInfo) {
  result = {
    success: false,
    data: {
      tokenAddress: tokenInfo.address,
      symbol: tokenInfo.symbol,
      name: tokenInfo.name,
      decimal: tokenInfo.decimals,
      hoders: []
    }
  }
  pages = 1 // Top 20*pages
  for (let i = 0; i < pages; i++) {
    await axios.get("https://api-cypress.scope.klaytn.com/v1/tokens/"+tokenInfo.address+"/holders?page="+(i+1))
      .then(response => {
        accountList = response.data.result
        for (let i = 0; i < accountList.length; i++) {
          const account = accountList[i];
          result.data.hoders.push({
            address: account.address,
            balance: parseInt(account.amountHeld) / 10**(tokenInfo.decimals)
          })
        }
      })
      .catch(error => { 
        result = {success: false, message: error.message}
      });
  }
  return result
}

// search token Info
const searchTokenInfo = async function (tokenAddress) {
  let result
  await axios.get('https://api-cypress.scope.klaytn.com/v1/tokens/' + tokenAddress)
    .then(response => {
      tokenInfo = response.data.result
      data = {
        address: tokenInfo.tokenAddress,
        symbol: tokenInfo.symbol,
        name: tokenInfo.tokenName,
        decimals: tokenInfo.decimals,
        totalSupply: tokenInfo.totalSupply
      }
      result = {success: true, data: data}
    })
    .catch(error => { 
      result = {success: false, message: error.message}
    });
  return result
}


module.exports = {
  searchHolders,
  searchTokenInfo
}