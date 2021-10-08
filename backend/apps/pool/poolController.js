const poolService = require('./poolService')
const CONSTS = require('../../utils/consts.js');

const getAllTokenPrice = function(req, res){
  // console.log("[Controller] ------> getAllTokenPrice")
  const swapName = req.params.swapName

  rtn = poolService.getAllTokenPrice(swapName, CONSTS.AUTH_NAME.DEFAULT, function(rslt){
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