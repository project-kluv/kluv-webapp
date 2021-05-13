const poolService = require('./poolService')

const getAllTokenPrice = function(req, res){
  console.log("[Controller] ------> getAllTokenPrice")
  const swapName = req.params.swapName

  rtn = poolService.getAllTokenPrice(swapName, function(rslt){
      if(rslt.success){
          res.send(rslt)
      }else{
          //TODO Error Handling
          res.send(rslt)
      }
  });
}

module.exports = {
  getAllTokenPrice:getAllTokenPrice
}