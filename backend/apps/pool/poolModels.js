const fs = require('fs');

const KLAYSWAP_TOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapTokenInfo.json", 'utf8'));

const getTokenInfo = function (appName){
  console.log("[Models] ------> getTokenInfo")
  if (appName === "klayswap") {
    return KLAYSWAP_TOKEN_INFO
  }
}

const addTokenInfo = function (appName, params) {
  console.log("[addTokenInfo] ------> getTokenInfo")
  if (appName === "klayswap") {
    console.log(params[0]+"/"+ params[1]+"/"+params[2]+"/"+params[3])

    KLAYSWAP_TOKEN_INFO[params[0]] = {
      "symbol": params[1],
      "name": params[2],
      "decimals": Number(params[3])
    }
    const json = JSON.stringify(KLAYSWAP_TOKEN_INFO)
    fs.writeFile("./utils/klayswapTokenInfo.json", json, function(err){
      if(err) console.log(err); 
    });
  }
}

module.exports = {
  getTokenInfo: getTokenInfo,
  addTokenInfo: addTokenInfo
};