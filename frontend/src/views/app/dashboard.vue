<template>
  <div class="main-content">
    <div class="breadcrumb" style="float:right;">
      <span style="margin-right:20px;">{{resetTime}}</span>
      <b-button variant="primary ripple m-1" @click="resetTokenPrice()">새로고침</b-button>
    </div>
    <breadcumb :page="'Dashboard'" :folder="'klaytn status'" />

    <b-row>
      <b-col lg="4" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Bitcoin"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.2 mb-2 font-weight-bold">KLAY</p>
            <p class="text-muted text-20 line-height-1 mb-1">{{swapKlayPriceKrw}}원</p>
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
      <b-col lg="4" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Cloud-Weather"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.5 mb-2 font-weight-bold">K-Premium</p>
            <p class="text-muted text-22 line-height-1.1 mb-2">{{kPremium*100}}%</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <!-- start::klaytnCoinPrice-->
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">
            <h5 class="card-title border-bottom p-3 mb-2">Klaytn Coin Price</h5>
            <vue-good-table
              :columns="priceColumns"
              :search-options="{
                enabled: true,
                placeholder: '검색'
              }"
              :line-numbers="false"
              styleClass="order-table vgt-table"
              :rows="priceData"
            >
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

export default {
  name: "Apps",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "klaytnCoinPrice"
  },
  data() {
    return {
      //cards
      swapKlayPriceUsd: 0,
      swapKlayPriceKrw: 0,
      swapKspPriceKrw: 0,
      swapKspPriceUsd: 0,
      kPremium: 0.08,
      //resetTime
      resetTime: "",
      usdKrw: 1110,
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
      priceData: []
    };
    
  },
  methods: {
      /**
       * testFunction
       */
      getTestData() {
        var url = "http://localhost:8080/test.json"
        axios.get(url)
          .then((res) => {
            this.priceData = res.data
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
        return axios.get("/web/pool/getAllTokenPrice/klayswap")
          .then((res) => {
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
                
                var exPrice = swapPriceKrw * (1+this.kPremium); //거래소가격(개발중), 임시로 swap가격*프리미엄 으로 대체

                var kPremium = (exPrice-swapPriceKrw)/swapPriceKrw
                var swapPrice = '<span class="text-15">'+swapPriceKrw +'원</span><span class="text-12 font-weight-light"> ($'+ swapPriceUsd +')</span>'
                var obj = {name:symbol, swapPriceUsd:swapPriceUsd, swapPriceKrw:swapPriceKrw, exPrice:exPrice, swapPrice:swapPrice, kPremium:kPremium}
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
       }
    },
    created() {
      this.resetTokenPrice()
    }
  }

</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
