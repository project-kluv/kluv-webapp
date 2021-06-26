const fs = require('fs');
const KAS = require("../../../utils/kasUtils")


const DEFINIX_LPTOKEN_INFO = require("./definixLPTokenInfo.json")
const DEFINIX_ABI = require('./definixABI.json')

const multicallContract = "0xcFb035d876027cc5f495Ad1Df965835e55bfBBbe"
const multipoolAddress = "0x2afc6d4babcdfba8fad56f7d25c9f930e9c093ad"
const DEFINIX_TOKEN = "0xd51c337147c8033a43f3b5ce0023382320c113aa"
const LP_1 = "0x36c53ecbd87d105e8d2d71984ce4eb4f3f341402"
const FACTORY_ADDRESS = "0xdEe3df2560BCEb55d3d7EF12F76DCb01785E6b29"

const mainAddress = '0xFf8d772cCabEE9Ab92179500ce4D910711eaDAC2'


const test = async function() {

  const caver = KAS.initCaver()
  const contractAddress = FACTORY_ADDRESS //multipoolAddress
  const contractABI = DEFINIX_ABI['FACTORY'] //['TEST']

  const contract = new caver.contract(contractABI, contractAddress)
  response = await contract.methods.allPairsLength().call()
  console.log(response)

  response = await contract.methods.allPairs(24).call()
  console.log(response)

}



test()