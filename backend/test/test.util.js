const cexUtils = require('../utils/cexUtils')

//실행방법 : mocha test.util.js 
  
describe('환율 test! - axios 콜백', function () {
    it('환율 정보를 리턴해야함', function (done) {
        cexUtils.getUsdkrw(function(rtn) {
                console.log("환율= "  + rtn)
                done()
        })
    });
  });

  describe('환율 test! - axios async', function () {
    it('환율 정보를 리턴해야함', async function () {
        let rtn = await cexUtils.getUsdkrw2();
        console.log("환율= "  + rtn)
    });
  });


  describe('환율 test! - xmlhttprequest 동기', function () {
    it('환율 정보를 리턴해야함', async function () {
        let rtn = await cexUtils.getUsdkrw3();
        console.log("환율= "  + rtn)
        
    });
  });

