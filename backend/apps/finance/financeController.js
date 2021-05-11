const financeService = require('./financeService')


const getAllLPPool = function(req, res){
  console.log("[Controller] ------> getTokenPriceAll")
  const swapName = req.params.swapName

  rtn = financeService.getAllLPPool(swapName, function(rslt){
      if(rslt.success){
          res.send(rslt)
      }else{
          //TODO Error Handling
          res.send(rslt)
      }
  });
};

module.exports = {
  getAllLPPool:getAllLPPool
}