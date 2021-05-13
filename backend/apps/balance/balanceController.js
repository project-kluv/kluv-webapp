const balanceService = require('./balanceService')

const getBalance = function(req, res){
  var account = req.params.account

  rtn = balanceService.getBalance(account, function(rslt){
      if(rslt.success){
          res.send(rslt)
      }else{
          //TODO Error Handling
          res.send(rslt)
      }
  });
};



module.exports = {
  getBalance: getBalance
};