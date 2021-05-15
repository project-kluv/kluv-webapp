<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <breadcumb :page="'Dashboard'" :folder="'klaytn status'" />
    <b-row>
      <!-- ICON BG -->

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


    <div class="row">
      <!-- start::top selling product -->

      <!-- end::top-selling product -->
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
  </div>
  <!-- ============ Body content End ============= -->
</template>
<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Dashboard v1s"
  },
  data() {
    return {
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
      rows: [
        {
          id: 1,
          name:
            '<img src="https://pbs.twimg.com/profile_images/1047734710242164737/CjbT82vP_400x400.jpg"'+
            'class="rounded-circle avatar-sm" alt="">'+'KLAY',
          kspPrice: '$50,000',
          exchangePrice: '55,000 KRW',
          kPremium : 0.065,
          img:'Coinone'+
            '<img src="' +
            require("@/assets/images/products/iphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/iphone-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
            
          span:
            '<span class="badge badge-pill badge-outline-primary p-2 ">Delivered</span>',
          createdAt: "2019-10-31 ",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 1,
          name:
            '<img src="https://pbs.twimg.com/profile_images/1047734710242164737/CjbT82vP_400x400.jpg"'+
            'class="rounded-circle avatar-sm" alt="">'+'KLAY',
          kspPrice: '$50,000',
          exchangePrice: '55,000 KRW',
          kPremium : 0.065,
          img:'Coinone'+
            '<img src="' +
            require("@/assets/images/products/iphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/iphone-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
            
          span:
            '<span class="badge badge-pill badge-outline-primary p-2 ">Delivered</span>',
          createdAt: "2019-10-31 ",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 1,
          name:
            '<img src="https://pbs.twimg.com/profile_images/1047734710242164737/CjbT82vP_400x400.jpg"'+
            'class="rounded-circle avatar-sm" alt="">'+'KLAY',
          kspPrice: '$50,000',
          exchangePrice: '55,000 KRW',
          kPremium : 0.065,
          img:'Coinone'+
            '<img src="' +
            require("@/assets/images/products/iphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/iphone-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
            
          span:
            '<span class="badge badge-pill badge-outline-primary p-2 ">Delivered</span>',
          createdAt: "2019-10-31 ",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        }                
      ]
    };
  }
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
