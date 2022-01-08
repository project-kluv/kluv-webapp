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
                    <b-button @click="onClickAllBtn()" variant="outline-success m-1">ALL</b-button>
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
              :rows="testData"
              :selectOptions="{
                enabled: false,
                selectionInfoClass: 'table-alert__box'
              }">
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
          label: "name",
          field: "name",
          html: true
        },
        {
          label: "tag",
          field: "tag",
          html: true
        },
        {
          label: "desc",
          field: "desc",
          html: true
        },
        {
          label: "category",
          field: "category",
          html: true
        },
        {
          label: "link",
          field: "link",
          html: true
        },
        {
          label: "tvl",
          field: "tvl",
          html: true
        },
        {
          label: "score",
          field: "score",
          html: true
        }
      ],
      testData:[]
    };
  },
  methods: {

      /**
       * 조회 test
       */
      getPortalData() {
        var arr = []
        return axios.get("/a.json").then((res) => {
            if (res.data.success == false) {
              this.$router.go(-1)
            } else {
              
              res.data.forEach(el => {
                var id = el.id
                var name = el.name 
                var tag = this.setTagStyle(el.tag)
                var desc = el.desc
                var category = el.category
                var link = '<a href="'+el.link+'" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a><a href="'+el.link+'" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>'
                var score = el.score
                var tvl = el.tvl

                var obj = {id:id, name:name, tag:tag, desc:desc, category:category, link:link, score:score, tvl:tvl}
                
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
       * 
       */
      setTagStyle(tagName) {
        
        var a = tagName.split(";")
        var res = ""

        console.log(a)

        a.forEach(el => {

          var b = el.split("/")
          var color = b[1]

          switch (color) {
            case "red":
              res += '<span class="badge badge-danger p-1">'+b[0] +'</span>&nbsp;'
              break;
            case "green":
              res +=  '<span class="badge badge-success p-1">'+b[0] +'</span>&nbsp;'
              break;
            case "blue":
              res +=  '<span class="badge badge-info p-1">'+b[0]+'</span>&nbsp;'
              break;
            case "purple":
              res += '<span class="badge badge-primary p-1">'+b[0]+'</span>&nbsp;'
              break;
            default:
              break;
          }
        });

        console.log(res)
        return res
        


      },

      /**
       * All btn
       */
      async onClickAllBtn() {
        
          var testData = await this.getPortalData()
          this.testData = testData

          console.log(testData)

      },

  },
    
    created() {
    },

    //Vue Instance 데이터가 마운트된 후 호출
    mounted() {


      
    }
  }

</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
