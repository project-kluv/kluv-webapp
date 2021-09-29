<template>
  <div class="main-content">
    <div class="breadcrumb" style="float:right;">
      <span style="margin-right:20px;">{{resetTime}}</span>
      <b-button variant="primary ripple m-1" @click="resetTokenPrice()">새로고침</b-button>
    </div>
    <breadcumb :page="'대시보드'" :folder="'klaytn'" />

    <b-row>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Bitcoin"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.2 mb-2 font-weight-bold">KLAY</p>
            <p class="text-muted text-20 line-height-1 mb-1">{{klayKrwPriceExchange}}원</p>
            <p class="text-muted text-16 line-height-1 mb-1">${{swapKlayPriceUsd}}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Financial"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.2 mb-2 font-weight-bold">KSP</p>
            <p class="text-muted text-20 line-height-1 mb-1">{{swapKspPriceKrw}}원</p>
            <p class="text-muted text-16 line-height-1 mb-1">${{swapKspPriceUsd}}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Cloud-Weather"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.5 mb-2 font-weight-bold">K-Premium</p>
            <p class="text-muted text-22 line-height-1.1 mb-2">{{(kPremium*100).toFixed(2)}}%</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Dollar"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.5 mb-2 font-weight-bold">환율(USD)</p>
            <p class="text-muted text-22 line-height-1.1 mb-2">${{usdKrw}}</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    
    <!-- start::chart-->
    <div id="chartArea">
    <h5 class="mb-2">{{chartTitle}} - 실시간 차트</h5>
    </div>
    <br>
    <!-- end::chart-->
    
    <!-- start::klaytnCoinPrice-->
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">
            <h5 class="card-title border-bottom p-3 mb-2">클레이튼 기반 토큰</h5>
            <vue-good-table
              :columns="priceColumns"
              :search-options="{
                enabled: true,
                placeholder: '검색'
              }"
              :line-numbers="false"
              styleClass="order-table vgt-table"
              :rows="priceData"
              @on-row-click="onRowClick">
            </vue-good-table>
          </div>
        </div>
      </div>  
    </div>
    <!-- end::klaytnCoinPrice -->
  </div>
</template>
<script>
import axios from "axios";
import { createChart } from 'lightweight-charts';





export default {
  
  name: "Apps",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "klaytnCoinPrice"
  },
  data() {
    return {
      
      //chart
      lineSeries: '',
      chartTitle: '',
      test:'test',

      //cards
      klayKrwPriceExchange: 0,
      swapKlayPriceUsd: 0,
      swapKlayPriceKrw: 0,
      swapKspPriceKrw: 0,
      swapKspPriceUsd: 0,
      kPremium: 0,
      usdKrw: 0,
      //resetTime
      resetTime: "",
      //priceTableColumns
      priceColumns: [
        {
          label: "코인명",
          field: "name",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "가격(거래소)",
          field: "exPrice",
          type: "decimal",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "가격(DEX)",
          field: "swapPrice",
          html: true,
          //type: "decimal",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "K-프리미엄",
          field: "kPremium",
          // html:true,
          type: "percentage",
          thClass: "text-left",
          tdClass: "text-left"
        }
      ],
      //priceTable data
      priceData: [],
      chartData: []
    };
    
  },
  methods: {
      /**
       * 테스트용
       */
      getTestData() {
        
        var url = "https://api.bithumb.com/public/ticker/KLAY"

        axios.get(url)
          .then((res) => {
            var a = res.data.data.closing_price;
            this.test = a
          })
          .catch((error) => {
            console.log('proxyRequest error', error)
          })
      },

      /**
       * 클레이가격조회 (임시)
       * TODO : 서버단에서 조회 (CORS문제)
       */
      getKlayPrice() {
        
        var url = "https://api.bithumb.com/public/ticker/KLAY"

        axios.get(url)
          .then((res) => {
            var a = res.data.data.closing_price;
            this.klayKrwPriceExchange = a
          })
          .catch((error) => {
            console.log('proxyRequest error', error)
          })
      },

      /**
       * klayswap의 모든 토큰가격을 조회
       * return objetArray(name,price)
       */
      getKlaySwapAllTokenPrice() {
        var arr = []
        return axios.get("/web/pool/getAllTokenPrice/klayswap").then((res) => {
            if (res.data.success == false) {
              this.$router.go(-1)
            } else {
              var tokenPrice = res.data.response.token
              var tokenKeys = Object.keys(tokenPrice)

              tokenKeys.forEach(key => {
                var symbol = tokenPrice[key].symbol
                var swapPriceUsd = (tokenPrice[key].price).toFixed(3)
                var swapPriceKrwOrigin = tokenPrice[key].price*this.usdKrw
                var swapPriceKrw = (swapPriceKrwOrigin >= 100 ? Math.round(swapPriceKrwOrigin) : (swapPriceKrwOrigin).toFixed(2) );                
                
                if(symbol=='KLAY') {
                  exPrice = this.klayKrwPriceExchange
                }else{
                  var exPrice = swapPriceKrw * (1+this.kPremium); //임시로 swap가격*프리미엄 으로 대체
                }

                var kPremium = (exPrice-swapPriceKrw)/swapPriceKrw

                if(symbol=='KLAY'){
                  this.kPremium = kPremium
                }

                var swapPrice = '<span class="text-15">'+swapPriceKrw +'원</span><span class="text-12 font-weight-light"> ($'+ swapPriceUsd +')</span>'
                var obj = {key:key, name:symbol, swapPriceUsd:swapPriceUsd, swapPriceKrw:swapPriceKrw, exPrice:exPrice, swapPrice:swapPrice, kPremium:kPremium}
                arr.push(obj)
              });
              return arr
            }
          })
          .catch((error) => {
            console.log('proxyRequest error', error)
            return false
          })
      },

      /**
       * 새로고침
       * 대시보드상의 모든 klayswap토큰가격을 불러온다.
       */
      async resetTokenPrice() {
          this.getUsdKrw()
          this.getKlayPrice()
        
          var klaySwapPriceArr = await this.getKlaySwapAllTokenPrice()
          //cards
          this.swapKlayPriceUsd = klaySwapPriceArr[0].swapPriceUsd 
          this.swapKlayPriceKrw = Math.round(klaySwapPriceArr[0].swapPriceKrw)
          this.swapKspPriceUsd = klaySwapPriceArr[12].swapPriceUsd
          this.swapKspPriceKrw = Math.round(klaySwapPriceArr[12].swapPriceKrw)
          //this.kPremium = 3.2
          //tokenPriceTable
          this.priceData = klaySwapPriceArr
          //resetTime
          this.resetTime = new Date().toLocaleString()
      },

      /**
       * 환율조회
       */
      getUsdKrw() {

        var url = "/web/common/getRate"

        axios.get(url).then((res) => {
          var usdkrw = res.data.response.data.rate
          this.usdKrw = usdkrw

        }).catch((error) => {
          console.log('proxyRequest error', error)
        })

      },
      /**
       * 차트데이터 update
       * @param name 선택한 토큰 name(심볼)
       * @param key 선택한 토큰의 key(주소값)
       */
      updateChart(name, key) {

        var url = "/web/token/getChartData/"+key

        axios.get(url).then((res) => {
          var resArr = res.data.response.tokens
          var dataArr = []

          //날짜값 형식에 맞게 가공 (timestamp)
          for (let i = 0; i < resArr.length; i++) {
              var a= {}
              var dateTime = resArr[i].dateTime
              var time = Math.floor(new Date(dateTime).getTime()/1000)

              a.time = time
              a.value = resArr[i].price
              dataArr[i] = a
          }

          this.lineSeries.setData(dataArr)
          this.chartTitle = name

        }).catch((error) => {
          console.log('proxyRequest error', error)
        })
       },

       /**
        * datatable row클릭시 이벤트
        * params : 해당 row 정보
        */
       onRowClick(params) {
         var name = params.row.name
         var key = params.row.key

         this.updateChart(name, key)
       }


  },
    
    created() {
    },

    //Vue Instance 데이터가 마운트된 후 호출
    mounted() {
        this.resetTokenPrice()

        //차트
        const chart = createChart(document.getElementById('chartArea'), {
          width: 1000,
          height: 300,
          localization: {
            dateFormat: 'yyyy-MM-dd',
          },
          grid: {
            vertLines: {
              color: 'rgba(197, 203, 206, 0.7)',
            },
            horzLines: {
              color: 'rgba(197, 203, 206, 0.7)',
            },
          },
          timeScale: {
            timeVisible: true,
            secondsVisible: false,
          },
          // localization: {
          //   timeFormatter: businessDayOrTimestamp => {
          //     // console.log(businessDayOrTimestamp);

          //     if (LightweightCharts.isBusinessDay(businessDayOrTimestamp)) {
          //       return 'Format for business day';
          //     }

          //     return 'Format for timestamp';
          //   },
          // },
        });
      const lineSeries = chart.addLineSeries();
      this.lineSeries = lineSeries //차트 데이터 컨트롤가능 객체, 전역으로 사용
      
      //차트 초기값 klay
      this.updateChart('KLAY','0x0000000000000000000000000000000000000000')
      

    }
  }

</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
