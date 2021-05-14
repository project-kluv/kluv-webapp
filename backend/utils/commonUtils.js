const axios = require('axios')
const fs = require('fs');
const Caver = require('caver-js-ext-kas');

const AUTH = JSON.parse(fs.readFileSync("./utils/auth.json", 'utf8'));
const KSP_CONTRACT_ADDRESS = JSON.parse(fs.readFileSync("./utils//kspContractAddress.json", 'utf8'));
const KSP_CONTRACT_ABI = JSON.parse(fs.readFileSync("./utils//kspContractABI.json", 'utf8'));

const getAuth = function(enName){
  console.log("[Utils] ------> getAuth")
  try {
    auth = AUTH[enName]
    return auth
  } catch (error) {
    console.log(error.message)
    return -1
  }
};
  
const initCaver = function() {
  console.log("[Utils] ------> initCaver")
  try {
    const AUTH = this.getAuth('KAS')
    const accessKeyId = AUTH["ACCESS_KEY"]
    const secretAccessKey = AUTH["SECRET_KEY"]
    const chainId = 8217
    const caver = new Caver(chainId, accessKeyId, secretAccessKey)
    return caver
  } catch (error) {
    console.log(error.message)
    return -1
  }
}

const getNewTokenInfo = async function(contractAddress){
  console.log("[Utils] ------> contractABI")
  try {
    const caver = this.initCaver()
    const contract = new caver.kct.kip7(contractAddress)
    const tokenName = await contract.methods.name().call()
    const tokenSymbol = await contract.methods.symbol().call()
    const tokenDecimals = await contract.methods.decimals().call()
    const tokenInfo = {
      "symbol" : tokenSymbol,
      "name" : tokenName,
      "decimals": tokenDecimals
    }
    return tokenInfo
  } catch (error) {
    console.log(error.message)
    return -1
  }
}

const getContract = function(appName, contractName) {
  console.log("[Utils] ------> getContract")
  try {
    const caver = this.initCaver()
    if (appName == "klayswap") {
      const contractAddress = KSP_CONTRACT_ADDRESS[contractName]
      const contractABI = KSP_CONTRACT_ABI[contractName]
      const contract = new caver.contract(contractABI, contractAddress)
      return contract
    } else {
      throw new Error("getContract Error")
    }
  } catch (error) {
    console.log(error.message)
    return -1
  }
}

module.exports = {
    getAuth: getAuth,
    initCaver:initCaver,
    getNewTokenInfo:getNewTokenInfo,
    getContract:getContract
};