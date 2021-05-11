const axios = require('axios')
const Caver = require('caver-js-ext-kas');
const contractService = require('../contract/contractService')

const getTokenPriceAll = async function(swapName, callbak){
  console.log("[service] ------> getTokenPriceAll")
  try {
    if (swapName === 'klayswap') {
      params = {"swapName":swapName, "contractName": "FACTORY_VIEW", "method":"getFullData"}
      
      rst = await contractService.callContract(params)
      
      
      callbak({success : true , response: rst})
    } else throw new Error("거래소 설정이 잘못되었습니다")
    
  } catch (error) {
    callbak({success : false , message: error.message})
  }
};

module.exports = {
  getTokenPriceAll:getTokenPriceAll
}