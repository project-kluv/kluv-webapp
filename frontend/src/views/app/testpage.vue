<template>
  <div class="main-content">
    <div class="breadcrumb" style="float:right;">
      <!-- <span style="margin-right:20px;">{{resetTime}}</span> -->
      <!-- <b-button variant="primary ripple m-1" @click="resetTokenPrice()">새로고침</b-button> -->
    </div>
    <breadcumb :page="'TEST'" :folder="'klayswap'" />
    <!-- start::klaytnCoinPrice-->
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">
            <div class="card-title border-bottom">
              <b-row>
                <!-- 타이틀 --> 
                <b-col xs="12" md="12" lg="12">
                  <div class ="p-4 mb-2">
                    DAPP

                    <b-button variant="outline-success m-1">ALL</b-button>
                    <b-button variant="outline-primary ripple m-1">DEFI</b-button>
                    <b-button variant="outline-primary ripple m-1">NFT</b-button>
                    <b-button variant="outline-primary ripple m-1">FARM</b-button>
                    <b-button variant="outline-primary ripple m-1">LANDING</b-button>
                    <b-button variant="outline-primary ripple m-1">P2E</b-button>
                    <b-button variant="outline-primary ripple m-1">Primary</b-button>
                    <b-button variant="outline-primary ripple m-1">Primary</b-button>
                  </div>
                </b-col>  
              </b-row>
            </div>


             <!-- (기준시 : {{tokenInfoDatetime}}) -->
    <vue-good-table
      :columns="columns"
      :line-numbers="true"
      :search-options="{
        enabled: true,
        placeholder: 'Search this table'
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
      compactMode
      styleClass="tableOne vgt-table"
      :selectOptions="{
        enabled: false,
        selectionInfoClass: 'table-alert__box'
      }"
      :rows="rows"
    >

      <!-- <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'button'">
          <a href="">
            <i class="i-Eraser-2 text-25 text-success mr-2"></i>
            {{ props.row.button }}</a
          >
          <a href="">
            <i class="i-Close-Window text-25 text-danger"></i>
            {{ props.row.button }}</a
          >
        </span>
      </template> -->
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
    title: "klaySwapPrice"
  },
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name",
          html: true
        },
        {
          label: "Tag",
          field: "tag",
          html: true
        },
        {
          label: "Desc",
          field: "desc",
          html: true
        },
        {
          label: "Category",
          field: "category",
          html: true
        },
        {
          label: "Link",
          field: "link",
          html: true,
          // tdClass: "text-right",
          // thClass: "text-right"
        },
        {
          label: "Tvl",
          field: "tvl",
          html: true, 
        },
        {
          label: "Score",
          field: "score",
          html: true
        }
      ],
      rows: [
        {
          id: 1,
          name:  '<img width="30" height="30" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAABYlAAAWJQFJUiTwAAABpElEQVRYCcWXga2DIBCG794EjsAIjtARHMEROoIjdISO4AgdwRF8G7gBL5ifhicHwkmiyaUtNfd9ChzA1lq68/q5ld5CgJkfzDwxs1ElcF2gCSIa8Tm7NIg3ET1q8mnhDvQkIhPAw1jxf9dcAPDNJSeiV0LAx4b7TRMBJNtfNX5vJwIuFsiKEhq4i96NgQq4vzcaHxr4B21LJdx3SVclcIBbJOwVcB9TsYAA3xLtpfDoLdTAd3sk18K/bzErkHlCg/l9Bf6dRaJABj7j//Ui3MUqCpz07YOIhgbwPSKBE/hq47qvhqcEsoNGqPuLH82tBFJlVar7/sldPXhpJCSBT2rEArYJcN/2rpRYJIHUymaCxBLcKiTiaZgor2Hdz8FrJYbUNDzO8RHTrwReKrH+Yx4ExuONaCuFl0g8s4tRMBinQ/eUwnMSS8QTBAxg5gJcknA5+qINSVBgrsCPEuIGVTwXWGs3fDUYmNrr1712Zu6CnPXnAsyE3FoRPXXp+aBIIOwa7AekJXnFhiW5BZdCfThl5gGDi9DPsyqPVqDVde/pmIj+AL6bAVImW5OaAAAAAElFTkSuQmCC"/>　Klaytn  ',
          tag:'<span class="badge badge-primary"> Update</span>',
          desc: '이것은 설명 이다 클레이튼 DEX 입니다',
          category: 'DEX',
          link: '<a href="https://bridge.orbitchain.io/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a><a href="https://t.me/Orbit_Chain" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>',
          score: '68',
          tvl:'1,231,515M'
        },
        {
          id: 2,
          name:  '<img src="http://localhost:8080/img/klayswap.c47fc52e.svg" width="30" height="30"/>　Ksp  ',
          tag:'<span class="badge badge-danger">Danger</span>',
          desc: '이것은 망하기 직전인 KSP 입니다',  
          category: 'DEX',
          link: '<a href="https://bridge.orbitchain.io/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a><a href="https://t.me/Orbit_Chain" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>',
          score: '24',
          tvl:'231,515M'
        },
        {
          id: 3,
          name:  '<img src="http://localhost:8080/img/krust.df728401.png" width="30" height="30"/>　Krust  ',
          tag:'<span class="badge badge-primary"> Update</span>',
          desc: '이것은 설명 이다 클레이튼 DEX 입니다',
          category: 'DEX',
          link: '<a href="https://bridge.orbitchain.io/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a><a href="https://t.me/Orbit_Chain" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>',
          score: '35',
          tvl:'3,231,515M'
        },
        {
          id: 4,
          name: "Chris",
          span: '<span class="badge badge-primary">Primary</span>',
          createdAt: "2011-10-11",
          score: 0.03343
        },
        {
          id: 5,
          name: "Dan",
          span: '<span class="badge badge-danger">Primary</span>',
          createdAt: "2011-10-21",
          score: 0.03343
        },
        {
          id: 6,
          name: "John",
          span: '<span class="badge badge-success">success</span>',
          createdAt: "2011-10-31",
          score: 0.03343
        },
        {
          id: 1,
          name: "John",
          span: '<span class="badge badge-warning">Warning</span>',
          createdAt: "2019-10-29",
          score: 0.03343
        },
        {
          id: 2,
          name: "Jane",
          span: '<span class="badge badge-info">Info</span>',
          createdAt: "2011-10-31",
          score: 0.03343
        },
        {
          id: 3,
          name: "Susan",
          span: '<span class="badge badge-dark">Dark</span>',
          createdAt: "2011-10-30",
          score: 0.03343
        },
        {
          id: 4,
          name: "Chris",
          span: '<span class="badge badge-warning">Warning</span>',
          createdAt: "2011-10-11",
          score: 0.03343
        },
        {
          id: 5,
          name: "Dan",
          span: '<span class="badge badge-info">Info</span>',
          createdAt: "2011-10-21",
          score: 0.03343
        },
        {
          id: 6,
          name: "John",
          span: '<span class="badge badge-primary">Primary</span>',
          createdAt: "2011-10-31",
          score: 0.03343
        }
      ]
    };
  },
  methods: {



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
