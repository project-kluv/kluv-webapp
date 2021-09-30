const poolService = require('../apps/pool/poolService')
const balanceService = require('../apps/balance/balanceService')

//실행방법 : mocha test.util.js 

describe('- axios async', function () {
  this.timeout(5000);
  it(' ', async function () {
    let rtn = await poolService.getAllLPPool('klayswap','KAS');
    console.log(rtn)
  });
});


