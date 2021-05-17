const cexUtils = require('../utils/cexUtils')

describe('환율 test!', function () {
    it('환율 정보를 리턴해야함', function (done) {
        cexUtils.getUsdkrw(function(rtn) {
            if(rtn.success && rtn.response >= 0 && rtn.response <= 999999){
                console.log("환율= "  + rtn.response)
                done();
            }else{
                console.log(rtn.message)
            }
        })
    });
  });