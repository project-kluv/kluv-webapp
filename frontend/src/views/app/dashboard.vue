<template>
  <div class="main-content">
    <div class="breadcrumb" style="float:right;">
      <!-- <span style="margin-right:20px;">{{resetTime}}</span> -->
      <!-- <b-button variant="primary ripple m-1" @click="resetTokenPrice()">새로고침</b-button> -->
    </div>
    <breadcumb :page="'대시보드'" :folder="'klayswap'" />

    <b-row>
      <b-col lg="4" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Coin"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.2 mb-2 font-weight-bold">KLAY</p>
            <p class="text-muted text-20 line-height-1 mb-1">{{klayKrwPriceExchange}}원</p>
            <p class="text-muted text-16 line-height-1 mb-1">${{swapKlayPriceUsd}}</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="4" md="6" sm="12">
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
      <!-- <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Cloud-Weather"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.5 mb-2 font-weight-bold">K-Premium</p>
            <p class="text-muted text-22 line-height-1.1 mb-2">{{(kPremium*100).toFixed(2)}}%</p>
          </div>
        </b-card>
      </b-col> -->
      <b-col lg="4" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Dollar"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.5 mb-2 font-weight-bold">환율(USD)</p>
            <p class="text-muted text-22 line-height-1.1 mb-2">{{usdKrw}}원</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    
    <!-- start::chart-->
    
        <!-- start::klaytnCoinPrice-->
     <b-row>
      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">
            <h5 id="area" class="card-title border-bottom p-3 mb-2">{{chartTitle}} - 실시간 차트</h5>
            <div  style="overflow:auto; width: 100%;" id="chartArea"></div>
          </div>
        </div>
      </div>
    </b-row>
    <!-- end::chart-->
    
    <!-- start::klaytnCoinPrice-->
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">



<!--  -->
    <!-- <b-row>
      <b-col lg="7" md="6" sm="12">
        <b-card class="card-title border-bottom p-3 mb-3">
        Klayswap 토큰 가격
        </b-card>
      </b-col>
      <b-col lg="5" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
                <span style="margin-right:20px; font-size:12px;">{{resetTime}}</span>
                <b-button size="sm" variant="primary ripple m-1" @click="resetTokenPrice()">새로고침</b-button>

        </b-card>
      </b-col>
    </b-row> -->


<!--  -->

            
            <div class="card-title border-bottom">
              <b-row>
                <!-- 타이틀 -->
                <b-col xs="12" md="6" lg="6">
                  <div class ="p-4 mb-2">
                    Klayswap 토큰 가격
                  </div>
                </b-col>
                <!-- 새로고침(우측영역) -->
                <b-col xs="12" md="6" lg="6">
                  <div class ="p-3 mb-2" style="float:right;">
                      <span style="margin-right:20px; font-size:12px;">{{resetTime}}</span>
                      <b-button size="sm" variant="primary ripple m-1" @click="resetTokenPrice()">새로고침</b-button>
                  </div>
                </b-col>
              </b-row>
            </div>


             <!-- (기준시 : {{tokenInfoDatetime}}) -->
            <vue-good-table
              :columns="priceColumns"
              :search-options="{
                enabled: true,
                placeholder: '검색'
              }"
              :line-numbers="false"
              styleClass="order-table vgt-table"
              :rows="priceData"
              compactMode
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
    title: "klaySwapPrice"
  },
  data() {
    return {
      //boolean
      isEnd:true,

      //chart
      chart:'',
      lineSeries: '',
      chartTitle: '',
      test:'test',

      tokenInfoDatetime:'',

      selectedKey:'0x0000000000000000000000000000000000000000',
      selectedSymbol:'KLAY',

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
          tdClass: "text-left",
          formatFn: this.formatFnName
        },
        {
          label: "가격(USD)",
          field: "swapPriceUsd",
          type: "number",
          thClass: "text-left",
          tdClass: "text-left",
          //sortFn: this.sortFnSwapPriceUsd, //sort이슈 formatFn으로 해결
          formatFn: this.formatFnSwapPriceUsd
        },
        {
          label: "가격(KRW)",
          field: "swapPriceKrw",
          type: "number",
          thClass: "text-left",
          tdClass: "text-left",
          formatFn: this.formatFnSwapPriceKrw
        },
        // {
        //   label: "가격(거래소)",
        //   field: "exPrice",
        //   type: "number",
        //   thClass: "text-left",
        //   tdClass: "text-left"
        // }
      ],
      //priceTable data
      priceData: [],
      chartData: []
    };
    
  },
  methods: {

      /*
      * resize event
      * 브라우저 사이즈 조절시 발생 event
      * 특정상황에 충돌발생하여 setTimeout사용,
      * 사이즈관련 다른 동작들이 끝난 후 사이즈 조절
      */
      handleResize(e) {
        if(this.isEnd){
          this.isEnd = false
          setTimeout(this.resizeChart, 400);
        }
        
      },

      /**
       * resizeChart
       */
      resizeChart: function (){
        var chartArea = document.getElementById('chartArea').clientWidth
        this.chart.resize(chartArea, 300);
        this.isEnd = true
      },

      /**
       * name data format
       */
      formatFnName: function(value) {
        return value;
      },
      /**
       * usd column data format
       */
      formatFnSwapPriceUsd: function(value) {
        value = this.setCommaSwapPrice(value)
        return '$ ' + value;
      },
      /**
       * krw column data format 설정
       */
      formatFnSwapPriceKrw: function(value) {
        value = this.setCommaSwapPrice(value)
        return value + ' 원';
      },
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
        return axios.get("/web/token/getAllCurrentTokenPrice").then((res) => {
            if (res.data.success == false) {
              this.$router.go(-1)
            } else {
              var tokenPrice = res.data.response.tokens
              
              var tokenKeys = Object.keys(tokenPrice)

              this.tokenInfoDatetime = tokenPrice[0].dateTime
              console.log(this.tokenInfoDatetime)
              tokenKeys.forEach(key => {
                var address = tokenPrice[key].address 
                var symbol = tokenPrice[key].symbol
                var swapPriceUsd = tokenPrice[key].price
                var swapPriceKrw = tokenPrice[key].price*this.usdKrw
                //var swapPriceKrw = (swapPriceKrwOrigin >= 100 ? Math.round(swapPriceKrwOrigin) : (swapPriceKrwOrigin).toFixed(4) );

                if(symbol=='KLAY') {
                  this.swapKlayPriceUsd = this.setCommaSwapPrice(swapPriceUsd)
                  this.swapKlayPriceKrw = this.setCommaSwapPrice(swapPriceKrw)

                  //klay만 가져옴
                  var exPrice = this.klayKrwPriceExchange
                  var kPremium = this.kPremium
                }else if(symbol == 'KSP'){
                  this.swapKspPriceUsd = this.setCommaSwapPrice(swapPriceUsd)
                  this.swapKspPriceKrw = Math.round(swapPriceKrw)
                }

                if(symbol=='KLAY'){
                  this.kPremium = kPremium
                }

                //var swapPrice = '<span class="text-15">'+swapPriceKrw +'원</span><span class="text-12 font-weight-light"> ($'+ swapPriceUsd +')</span>'
                var obj = {key:key, address:address, name:symbol, swapPriceUsd:swapPriceUsd, swapPriceKrw:swapPriceKrw, exPrice:exPrice, kPremium:kPremium}
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
       * swapPriceUsd
       * 데이터가공
       * 소숫점정리, 콤마추가
       */
      setCommaSwapPrice(price) {
        //소숫점정리
        if(price < 1) {
          price = price.toFixed(5)
        }else if(price < 10) {
          price = price.toFixed(4)
        }else if(price < 100) {
          price = price.toFixed(3)
        }else if(price > 100000) {
          price = price.toFixed(0)
        }else{
          price = price.toFixed(2)
        }

        //콤마추가
        const priceComma = price.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        return priceComma
      },

      /**
       * 새로고침
       * 대시보드상의 모든 klayswap토큰가격을 불러온다.
       */
      async resetTokenPrice(param) {

        //cards
        this.getUsdKrw()
        this.getKlayPrice()

        //초기값일경우 제외(임시처리)
        if(param != 'c') {
          //debugger;
            //chart width reset
            //초기 차트영역 div width 
            var chartArea = document.getElementById('chartArea');
            var chartAreaWidth = chartArea.clientWidth
            this.chart.resize(chartAreaWidth, 300);
            console.log('reset size, '+ chartAreaWidth)
        }


        //tokenPriceTable
        var klaySwapPriceArr = await this.getKlaySwapAllTokenPrice()


        //this.kPremium = 3.2

        this.priceData = klaySwapPriceArr
        //resetTime
        this.resetTime = new Date().toLocaleString()

        this.updateChart(this.selectedSymbol, this.selectedKey)
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
              a.time = Math.floor(new Date(resArr[i].dateTime).getTime()/1000)
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
         var key = params.row.address
         this.selectedSymbol = name
         this.selectedKey = key

         this.updateChart(name, key)
       }


  },
    
    created() {
    },

    //Vue Instance 데이터가 마운트된 후 호출
    mounted() {

        //resize 이벤트리스너 추가 
        window.addEventListener('resize', this.handleResize)

        this.resetTokenPrice('c')

        //초기 차트영역 div width 
        var chartArea = document.getElementById('chartArea');
        var chartAreaWidth = chartArea.clientWidth

        //차트생성
        const chart = createChart(document.getElementById('chartArea'), {
          width: chartAreaWidth,
          height: 300,
          localization: {
            dateFormat: 'yyyy-MM-dd',
          },
          rightPriceScale: {
            borderVisible: false,
          },
          layout: {
            backgroundColor: '#000',
            textColor: 'rgba(255, 255, 255, 0.8)',
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
      chart.applyOptions({
            watermark: {
                color: 'rgba(67, 95, 118, 0.4)',
                visible: true,
                text: 'KLUV.ME',
                fontSize: 24,
                horzAlign: 'left',
                vertAlign: 'bottom',
            },
            priceFormat: {
                type: 'custom',
                minMove: '0.000001',
                formatter: (price) => {
                    if (price < 0.000001) return parseFloat(price).toPrecision(8)
                    else if (price >= 0.00001 && price < 1) return parseFloat(price).toPrecision(5)
                    else if (price >= 1 && price < 10000) return parseFloat(price).toPrecision(5)
                    else return parseFloat(price).toPrecision(8)
                }
            }, 
            priceScale: {
              autoScale: true
            },
            localization: {
              locale: 'en-US',
                priceFormatter: (price) => {
                  if (price < 0.000001) return parseFloat(price).toPrecision(8)
                else if (price >= 0.000001 && price < 1) return parseFloat(price).toPrecision(6)
                  else if (price >= 1 && price < 10000) return parseFloat(price).toPrecision(5)
                else return parseFloat(price).toPrecision(8)
                }
},
        });
      const lineSeries = chart.addLineSeries();

      //차트 데이터 컨트롤가능 객체, 전역으로 사용
      this.chart = chart;
      this.lineSeries = lineSeries 
      
    }
  }

</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
