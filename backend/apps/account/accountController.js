const accountService = require('./accountService')

let getAccountInfo = function(req, res){
    var account = req.params.account

    rtn = accountService.getAccountBalance(account, function(rslt){
        if(rslt.success){
            res.send(rslt)
        }else{
            //TODO Error Handling
            res.send(rslt)
        }
    });

};

module.exports = {
    getAccountInfo: getAccountInfo
};