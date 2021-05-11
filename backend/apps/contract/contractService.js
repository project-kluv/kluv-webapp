const axios = require('axios')
const Caver = require('caver-js-ext-kas');

const contractModels = require('./contractModels')

const getAuth = function(enName, callbak){
  console.log("[service] ------> getAuth")
  try {
    auth = contractModels.getAuth(enName)
    callbak({success : true , response: auth})
  } catch (error) {
    callbak({success : false , message: error.message})
  }
};

const initCaver = function() {
  const chainId = 8217
  const accessKeyId = contractModels.getAuth('KAS')["ACCESS_KEY"]
  const secretAccessKey = contractModels.getAuth('KAS')["SECRET_KEY"]
  const caver = new Caver(chainId, accessKeyId, secretAccessKey)
  return caver
}

const callContract = async function(params, callbak){
  console.log("[service] ------> callContract")
  try {
    const swapName = params.swapName
    const contractName = params.contractName
    const method = params.method
    
    const contractAddress = contractModels.getContractAddressList(swapName)[contractName]
    const contractABI = contractModels.getContractABI(swapName)[contractName]
    if (contractAddress && contractABI && method){
      // KAS 연결
      const caver = this.initCaver()
      const contract = new caver.contract(contractABI, contractAddress)
      if (method == "getFullData") {
        rst = await contract.methods.getFullData().call()
      }else rst = 0
    } else throw new Error('parameter input error!')

    callbak({success : true , response: rst})
  } catch (error) {
    callbak({success : false , message: error.message})
  }
};

module.exports = {
  getAuth: getAuth,
  initCaver:initCaver,
  callContract: callContract
};

