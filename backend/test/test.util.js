const cexUtils = require('../utils/cexUtils')
const scopeUtils = require('../utils/scopeUtils')
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
    let rtn = await gazuaService.searchOpportunity(0.01);
    console.log(rtn)
  });
});


/*
  클레이 스코프 Utils 함수 테스트
*/

// describe('토큰 홀더 확인 - axios async', function () {
//   this.timeout(10000);
//   it('토큰 홀더 확인', async function () {
//     kspInfo = {
//       "address": '0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654',
//       "symbol": "KSP",
//       "name": "KlaySwap Protocol",
//       "decimals": 18
//     }
//     let rtn = await scopeUtils.searchHolders(kspInfo);
//     console.log(rtn)
//   });
// });

// describe('토큰 정보 확인 - axios async', function () {
//   this.timeout(20000);
//   it('토큰 홀더 확인', async function () {
//     kspAddress = '0xc6a2ad8cc6e4a7e08fc37cc5954be07d499e7654'
//     let rtn = await scopeUtils.searchTokenInfo(kspAddress);
//     console.log(rtn)
//   });
// });








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
