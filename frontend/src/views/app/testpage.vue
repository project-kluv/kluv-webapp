<template>
  <div class="main-content">
    <div class="breadcrumb" style="float:right;">
    </div>
    <breadcumb :page="'TEST'" :folder="'klayswap'" />

    <div class="row">
      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">
            <div class="card-title border-bottom">
              <b-row>
                <!-- 타이틀 --> 
                <b-col xs="12" md="12" lg="12">
                  <div class ="p-4 mb-2">

                    <div class="col-xs-12" style="margin-right:20px;">
                      Klaytn Dapp List
                    </div>
                    <!-- <div role="group" aria-label="Basic example" class="btn-group">
                      <button @click="onClickAllBtn()" type="button" class="btn btn-secondary">Left</button>
                      <button type="button" class="btn btn-secondary">Middle</button>
                      <button type="button" class="btn btn-secondary">Right</button>
                    </div> -->
                    <b-button :pressed.sync="allToggle" @click="onClickAllBtn" variant="outline-primary ripple m-1">ALL</b-button>
                    <b-button :pressed.sync="myToggle1" @click="onClickBtn" variant="outline-primary ripple m-1">DEX</b-button>
                    <b-button :pressed.sync="myToggle2" @click="onClickBtn" variant="outline-primary ripple m-1">FARM</b-button>
                    <b-button :pressed.sync="myToggle3" @click="onClickBtn" variant="outline-primary ripple m-1">NFT</b-button>
                    <b-button :pressed.sync="myToggle4" @click="onClickBtn" variant="outline-primary ripple m-1">LENDING</b-button>
                    <b-button :pressed.sync="myToggle5" @click="onClickBtn" variant="outline-primary ripple m-1">STABLE</b-button>
                    <b-button :pressed.sync="myToggle6" @click="onClickBtn" variant="outline-primary ripple m-1 ">MEME</b-button>
                  </div>

                </b-col>
              </b-row>
            </div>

            <vue-good-table
              :columns="columns"
              :line-numbers="true"
              :search-options="{
                enabled: true,
                //trigger: 'enter',
                //skipDiacritics: true,
                placeholder: 'Search this table',
                //externalQuery: searchQuery
              }"
              @on-search="onSearch"
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
  </div>
</template>

<script>
import axios from "axios";
import pic from '@/assets/images/site/klaytnscope.png'


export default {
  
  name: "Apps",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "klaySwapPrice"
  },
  data() {
    return {

      //btn toggle test
      myToggle1: false,
      myToggle2: false,
      myToggle3: false,
      myToggle4: false,
      myToggle5: false,
      myToggle6: false,
      allToggle: true,
      
      kluv: require('@/assets/images/site/klaytnscope.png'),
      pic:pic,
      columns: [
        {
          label: "Name",
          field: "name",
          html: true,
          width: '150px',
        },
        {
          label: "Tag",
          field: "tag",
          html: true,
          width: '100px',
        },
        {
          label: "Description",
          field: "desc",
          html: true,
          width: '300px',
        },
        {
          label: "Investor",
          field: "investor",
          html: true,
          width: '150px',
        },
        {
          label: "Partner",
          field: "partner",
          html: true,
          width: '150px',
        },
        {
          label: "Category",
          field: "category",
          html: true
        },
        {
          label: "Link",
          field: "link",
          html: true
        },
        {
          label: "Tvl",
          field: "tvl",
          html: true
        },
        {
          label: "Score",
          field: "score",
          html: true
        }
      ],
      testData:[]
    };
  },
  computed:{
      // btnStates(a,b,c) {
      //   debugger;
      //   console.log(a);
      //   return this.buttons.map(btn => btn.state)
      // }
  },
  methods: {
    
      /**
       * grid search event
       * params.searchTerm - term being searched for
       * params.rowCount - number of rows that match search
       */
      onSearch(params) {

      },
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
                var name = '<a href="'+el.linkApp+'" target="_blank"><img style="width:30px;height:30px;" src="'+el.logo+'">&nbsp;'+el.name+'</a>'
                var tag = this.setTagStyle(el.tag)
                var desc = el.desc
                var investor = el.investor
                var partner = el.partner
                var category = el.category
                var link = '<a href="'+el.linkApp+'" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a><a href="'+el.linkChat+'" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>'
                var score = el.score
                var tvl = el.tvl

                var obj = {id:id, name:name, tag:tag, desc:desc, investor:investor, partner:partner, category:category, link:link, score:score, tvl:tvl}
                
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
       * 구분자를 통해 tag 분리 및 class적용
       * @param tagName
       */
      setTagStyle(tagName) {
        
        var a = tagName.split(";")
        var res = ""

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
        return res
      },

      /**
       * All btn
       */
      async onClickAllBtn() {
        
          var testData = await this.getPortalData()
          this.testData = testData

          this.myToggle1 = false;
          this.myToggle2 = false;
          this.myToggle3 = false;
          this.myToggle4 = false;
          this.myToggle5 = false;
          this.myToggle6 = false;

      },

      /**
       * 버튼클릭 이벤트
       */
      onClickBtn() {
        this.allToggle = false;

        var a = this.myToggle1
        var b = this.myToggle2
        var c = this.myToggle3
        var d = this.myToggle4
        var e = this.myToggle5
        var f = this.myToggle6

        var btnActiveArr = [a,b,c,d,e,f]
        var categoryArr = ['DEX','FARM','NFT','LENDING','STABLE','MEME']
        var paramArr = [];
        var count = 0;

        for (let i = 0; i < btnActiveArr.length; i++) {
          if(btnActiveArr[i]){
            count++
            paramArr.push(categoryArr[i])
          }
        }

        //전체를 다 선택했을 경우
        if(count==6){
          this.allToggle = true;
          this.onClickAllBtn()
        }else{
          console.log(paramArr)
        }

        


      },
      

  },
    
    created() {
    },

    //Vue Instance 데이터가 마운트된 후 호출
    mounted() {
      this.onClickAllBtn()

      
    }
  }

</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
