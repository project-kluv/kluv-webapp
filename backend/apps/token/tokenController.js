const Token = require('./tokens')
const Current = require('./currentData')
const SwapTokenInfo = require('./klayswapTokenInfo')
const tokenService = require('./tokenService')

const insert = function(req, res){
  console.log("[Controller] ------> insert")
  const address = req.params.address
  const price = req.params.price

  console.log(address + "," + price)

  const token = new Token({
    address:address,
    price:price
  })

  token.save(function(err) {
    if (err) throw err;
    console.log('User saved successfully!');
  });

  res.send({test:"success"})
  
}

const getChartData = function(req, res){
  console.log("[Controller] ------> get")
  const address = req.params.address
  Token.find({ address : address }, (err, tokens) => {
    res.send({sucess:true, response:{tokens:tokens}})
  });
}

const getCurrentTokenPrice = function(req, res){
  console.log("[Controller] ------> get")
  Current.find({}, (err, tokens) => {
    res.send({sucess:true, response:{tokens:tokens}})
  });
}

const test = function(req, res){
  console.log("[Controller] ------> test")

  var tokenInfo = {}
  tokenService.getKlayswapTokenInfo(function(rslt){
    if(rslt.success){
      tokenInfo = rslt.tokenInfo
      res.send(rslt)
    }else{
        //TODO Error Handling
        res.send(rslt)
    }
    console.log(tokenInfo)
  })

  // const KLAYSWAP_TOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapTokenInfo.json", 'utf8'));
  // const KLAYSWAP_LPTOKEN_INFO = JSON.parse(fs.readFileSync("./utils/klayswapLPTokenInfo.json", 'utf8'));

  // var tokenKeys = Object.keys(KLAYSWAP_LPTOKEN_INFO)
  // var arr = []
  
  // tokenKeys.forEach(key => {
  //     var address = key
  //     var tokenInfo = new SwapTokenInfo({
  //       type:"lp",
  //       address:address,
  //       symbol:KLAYSWAP_LPTOKEN_INFO[key].symbol,
  //       name:KLAYSWAP_LPTOKEN_INFO[key].name,
  //       decimals:KLAYSWAP_LPTOKEN_INFO[key].decimals
  //     })
  //     arr.push(tokenInfo)
  //   });
  //  SwapTokenInfo.insertMany(arr)
   //console.log(arr)




}

module.exports = {
  insert:insert,
  getChartData:getChartData,
  getCurrentTokenPrice:getCurrentTokenPrice,
  test:test
}