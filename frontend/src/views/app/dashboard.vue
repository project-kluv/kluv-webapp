<template>
  <div class="main-content">
    <breadcumb :page="'Dashboard'" :folder="'klaytn status'" />
    <b-row>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Bitcoin"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Klay Price</p>
            <p class="text-primary text-24 line-height-1 mb-2">$50,000</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Financial"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Ksp Price</p>
            <p class="text-primary text-24 line-height-1 mb-2">$150,000</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Cloud-Weather"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">K-Premium</p>
            <p class="text-primary text-24 line-height-1 mb-2">6.5%</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Money-2"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Krw</p>
            <p class="text-primary text-24 line-height-1 mb-2">1,200</p>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <!-- start::klaytnCoinPrice-->
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click="getData()">새로고침</button>
    </span>    
    <div class="row">
      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">
            <h5 class="card-title border-bottom p-3 mb-2">Klaytn Coin Price</h5>
            <vue-good-table
              :columns="columns"
              :line-numbers="false"
              styleClass="order-table vgt-table"
              :rows="rows"
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
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "klaytnCoinPrice"
  },
  data() {
    return {
      bool:true,
      columns: [
        {
          label: "Name",
          field: "name",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "price(ksp)",
          field: "kspPrice",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "price(exchange)",
          field: "exchangePrice",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        },

        {
          label: "K-premium",
          field: "kPremium",

          // html:true,
          type: "percentage",
          thClass: "text-left",
          tdClass: "text-left"
        }
      ],
      rows:[]
    };
  },
  //axios test
  methods: {
    getData() {
      var url = "";
      if(this.bool){
        url =  "http://localhost:8080/test.json";
        this.bool = false;
      }else{
        url =  "http://localhost:8080/test2.json";
        this.bool = true;
      }

      axios.get(url)
      .then((res) => {
        this.rows = res.data;
      })
      .catch((error) => {
        console.log('proxyRequest error', error)
      })
    }
  },  
  created() {
    this.getData();
  }
};

</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
