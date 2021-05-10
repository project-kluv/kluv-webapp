const fs = require('fs');

const AUTH = JSON.parse(fs.readFileSync("./apps/contract/auth.json", 'utf8'));
const KSP_CONTRACT_ADDRESS = JSON.parse(fs.readFileSync("./apps/contract/kspContractAddress.json", 'utf8'));
const KSP_CONTRACT_ABI = JSON.parse(fs.readFileSync("./apps/contract/kspContractABI.json", 'utf8'));

const getAuth = function (enName){
  return AUTH[enName]
}

const getContractAddressList = function(swapName) {
  if (swapName === "klayswap") return KSP_CONTRACT_ADDRESS
  return 0
}

const getContractABI = function(swapName){
  if (swapName === "klayswap") return KSP_CONTRACT_ABI
  return 0
}

module.exports = {
  getAuth: getAuth,
  getContractAddressList: getContractAddressList,
  getContractABI: getContractABI
};