<style  scoped>
.app-footer {
    margin-top: 2rem;
    background: #eee;
    padding: 1.25rem;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: none;
}
</style>
<template>
  <div class="main-content" id="app">
    <breadcumb :page="'Blank'" :folder="'Pages'" />
    0x26C3fAB22Ee66e67051d3fF82f5536bFB5223CC7
    <div style="margin-bottom:10px;">
    <input type="text" class="form-control" placeholder="주소를 입력하세요" v-model="accountName">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" @click="proxyRequest(accountName)">조회</button>
    </span>
    </div>
    <br>
    <strong>{{accountInfo}}</strong>

  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'app',
  created() {
    //this.proxyRequest()
  },
  data() { 
    return { 
        accountName: null,
        accountInfo: [] 
      }; 
  },
  methods: {
    proxyRequest(accountName) {
      axios.get("/web/account/getInfo/"+accountName)
      .then((res) => {
        this.accountInfo = res.data
        console.log('proxyRequest res', res)
      })
      .catch((error) => {
        console.log('proxyRequest error', error)
      })
    }
  }
}
</script>
