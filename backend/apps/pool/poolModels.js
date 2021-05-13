const fs = require('fs');

const KLAYSWAP_TOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapTokenInfo.json", 'utf8'));

const getTokenInfo = function (appName){
  if (appName === "klayswap") {
    return KLAYSWAP_TOKEN_INFO
  }
}


module.exports = {
  getTokenInfo: getTokenInfo
};