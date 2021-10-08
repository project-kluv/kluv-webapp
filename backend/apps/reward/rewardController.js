const rewardService = require('./rewardService')
const CONSTS = require('../../utils/consts.js');

const getExpectedLPReturn = function(req, res){
  // console.log("[Controller] ------> getExpectedLPReturn")
  const swapName = req.params.swapName

  rtn = rewardService.getExpectedLPReturn(swapName, CONSTS.AUTH_NAME.DEFAULT, function(rslt){
      if(rslt.success){
          res.send(rslt)
      }else{
          //TODO Error Handling
          res.send(rslt)
      }
  });
}

module.exports = {
  getExpectedLPReturn:getExpectedLPReturn
}