const cexUtils = require('../utils/cexUtils')
const gazuaService = require('../apps/gazua/gazuaService')

//실행방법 : mocha test.util.js 



// describe('환율 test! - axios async', function () {
//   it('환율 정보를 리턴해야함', async function () {
//     let rtn = await cexUtils.getCurrency('usdkrw');
//     console.log(rtn)
//   });
// });

// describe('중앙화 거래소 가격 테스트! - axios async', function () {
//   it('코인 가격을 리턴해야함', async function () {
//     let rtn = await cexUtils.getCexPrice('binance', 'BTC', 'USDT');
//     console.log(rtn)
//   });
// });

// describe('중앙화 거래소 오더북 테스트! - axios async', function () {
//   it('코인 Orderbook을 리턴해야함', async function () {
//     let rtn = await cexUtils.getCexOrderbook('coinone', 'aaa', 'KRW');
//     console.log(rtn)
//   });
// });

// describe('프리미엄 테스트 - axios async', function () {
//   it('코인 Orderbook을 리턴해야함', function () {
//     let rtn = cexUtils.calcSwapKimp(2554, 2324);
//     console.log(rtn)
//   });
// });


// describe('차익거래 테스트- axios async', function () {
//   this.timeout(5000);
//   it('프리미엄 확인', async function () {
//     let rtn = await gazuaService.getOpportunity();
//     console.log(rtn)
//   });
// });


describe('차익거래 후보군- axios async', function () {
  this.timeout(5000);
  it('차익기회 확인', async function () {
    let rtn = await gazuaService.searchOpportunity(0);
    console.log(rtn)
  });
});









// describe('환율 test! - axios 콜백', function () {
//   it('환율 정보를 리턴해야함', function (done) {
//     cexUtils.getUsdkrw(function (rtn) {
//       console.log("환율= " + rtn)
//       done()
//     })
//   });
// });

// describe('환율 test! - axios async', function () {
//   it('환율 정보를 리턴해야함', async function () {
//     let rtn = await cexUtils.getUsdkrw2();
//     console.log("환율= " + rtn)
//   });
// });


// describe('환율 test! - xmlhttprequest 동기', function () {
//   it('환율 정보를 리턴해야함', async function () {
//     let rtn = await cexUtils.getUsdkrw3();
//     console.log("환율= " + rtn)

//   });
// });
