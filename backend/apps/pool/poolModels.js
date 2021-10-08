const fs = require('fs');

const KLAYSWAP_TOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapTokenInfo.json", 'utf8'));
const KLAYSWAP_LPTOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapLPTokenInfo.json", 'utf8'));

const getTokenInfo = function (appName){
  // console.log("[Models] ------> getTokenInfo")
  if (appName === "klayswap") {
    return KLAYSWAP_TOKEN_INFO
  }
}

const getLPTokenInfo = function (appName){
  // console.log("[Models] ------> getLPTokenInfo")
  if (appName === "klayswap") {
    return KLAYSWAP_LPTOKEN_INFO
  }
}

const addTokenInfo = function (appName, params) {
  // console.log("[Models] ------> addTokenInfo")
  if (appName === "klayswap") {
    const newTokenLen = params[0].length;
    for (let i = 0; i < newTokenLen; i++) {
    //  console.log(params[0][i]+"/"+ params[1][i]+"/"+params[2][i]+"/"+params[3][i])
      KLAYSWAP_TOKEN_INFO[params[0][i]] = {
        "symbol": params[1][i],
        "name": params[2][i],
        "decimals": Number(params[3][i])
      }
    }
    // KLAYSWAP_TOKEN_INFO[params[0]] = {
    //   "symbol": params[1],
    //   "name": params[2],
    //   "decimals": Number(params[3])
    // }
    const json = JSON.stringify(KLAYSWAP_TOKEN_INFO)
  //  console.log(json)
    fs.writeFile("./utils/klayswapTokenInfo.json", json, function(err){
      if(err) console.log(err); 
    });
  }
}

const addLPTokenInfo = function (appName, params) {
  // console.log("[Models] ------> addLPTokenInfo")
  if (appName === "klayswap") {
    const newLPTokenLen = params[0].length;
    for (let i = 0; i < newLPTokenLen; i++) {
      // console.log(params[0][i]+"/"+ params[1][i]+"/"+params[2][i]+"/"+params[3][i])
      KLAYSWAP_LPTOKEN_INFO[params[0][i]] = {
        "symbol": params[1][i],
        "name": params[2][i],
        "decimals": Number(params[3][i])
      }
    }

    // KLAYSWAP_LPTOKEN_INFO[params[0]] = {
    //   "symbol": params[1],
    //   "name": params[2],
    //   "decimals": Number(params[3])
    // }
    const json = JSON.stringify(KLAYSWAP_LPTOKEN_INFO)
    fs.writeFile("./utils/klayswapLPTokenInfo.json", json, function(err){
      if(err) console.log(err); 
    });
  }
}

module.exports = {
  getTokenInfo: getTokenInfo,
  addTokenInfo: addTokenInfo,
  getLPTokenInfo,
  addLPTokenInfo
};