const Token = require('./tokens')
const poolService = require('../pool/poolService')
const Current = require('./currentData')

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
  const address = req.params.address
  Current.find({}, (err, tokens) => {
    res.send({sucess:true, response:{tokens:tokens}})
  });
}

const test = function(req, res){
  console.log("[Controller] ------> test")
  const swapName = "klayswap"
  rtn = poolService.getAllTokenPrice(swapName, function(rslt){
    if(rslt.success){
      const tokenPrice = rslt.response.token
      var tokenKeys = Object.keys(tokenPrice)
      var arr = []
      tokenKeys.forEach(key => {
        var address = key
        var symbol = tokenPrice[key].symbol
        var swapPriceUsd = (tokenPrice[key].price)
        var token = new Token({
          address:address,
          name:symbol,
          price:swapPriceUsd,
        })
        arr.push(token)
      });
      //console.log(process.env.TEST)
   //   Token.insertMany(arr)
      res.send(arr)
    }else{
        res.send(arr)
    }
});
  
}

module.exports = {
  insert:insert,
  getChartData:getChartData,
  getCurrentTokenPrice:getCurrentTokenPrice,
  test:test
}