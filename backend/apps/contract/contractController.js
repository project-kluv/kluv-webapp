const contractService = require('./contractService')

const getAuth = function(req, res){
  const enName = req.params.enName
  rtn = contractService.getAuth(enName, function(rslt){
      if(rslt.success){
          res.send(rslt)
      }else{
          //TODO Error Handling
          res.send(rslt)
      }
  });
};

const callContract = function(req, res){
  console.log("[controller] ------> callContract")
  rtn = contractService.callContract(req, function(rslt){
    if(rslt.success){
      res.send(rslt)
    }else{
      res.send(rslt)
    }
  });
};

module.exports = {
  getAuth: getAuth,
  callContract:callContract
};