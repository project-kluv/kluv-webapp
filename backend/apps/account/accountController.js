const accountService = require('./accountService')

let getAccountInfo = function(req, res){
    var account = req.params.account

    rtn = accountService.getAccountInfo(account, function(rslt){
        if(rslt.success){
            res.send(rslt)
        }else{
            //TODO Error Handling
        }

    });

};

module.exports = {
    getAccountInfo: getAccountInfo
};