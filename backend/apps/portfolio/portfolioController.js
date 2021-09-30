const portfolioService = require('./portfolioService')
const CONSTS = require('../../utils/consts.js');

/*
 API : /web/voting/ExpectedLPReturn/klayswap
 Desc : 뭐하는건지좀
*/
const getMaximizeReturn = function(req, res){
  console.log("[Controller] ------> getMaximizeReturn")
  const account = req.query.account
  const appName = req.query.appName

  rtn = portfolioService.getMaximizeReturn([account, appName], CONSTS.AUTH_NAME.DEFAULT,  function(rslt){
      if(rslt.success){
          res.send(rslt)
      }else{
          //TODO Error Handling
          res.send(rslt)
      }
  });
}

module.exports = {
  getMaximizeReturn:getMaximizeReturn
}