<template>
    <div class="main-content">
         <breadcumb :page="'Account Information'" :folder="'Klaytn'" />
         클레이튼 주소입력
        <div class="search-bar">
            <input size="50" type="text" placeholder="주소를 입력하세요" @keyup.enter="searchInputAddress()" v-model="searchAddress"/>
            <i class="search-icon text-muted i-Magnifi-Glass1" @click="searchInputAddress()"></i>
        </div>
        <br>
        <div class="card user-profile o-hidden mb-30">
            <div class="header-cover" style="background-image: url(http://gull-html-laravel.ui-lib.com/assets/images/photo-wide-5.jpeg"></div>
                <div class="user-info">
                    <img class="profile-picture avatar-lg mb-2" src="https://w.namu.la/s/713dd9232a3ac5fbc38dff2a1d9cbcb388ad0ffe3d514ff82d13be5276118a0712d9237f6f9a01eb55ae0bddff0d3824bc4f0a3fbbab228e8092da9d04aeb867e13b462eca6279ee2e51367064e66944a7100a97429edd1c4946f47654bbe0ef0c6e47973cbc392b53462a03a552a0b3" alt="">
                        <p class="m-0 text-24">Klaytn Account</p>
                        <p class="text-muted m-0">{{address}} <i class="badge-icon i-File-Copy-2"></i></p>
            </div>
            <div class="card-body">
                <div>
                    <b-tabs content-class="mt-3" align="center">
                        <b-tab title="Account Balance" active>
                            <h4>Summary11</h4>
                        
                            <hr>
                            <div class="row">
                                <div class="col-md-4 col-6">
                                    <div class=" mb-30">
                                        <p class="text-primary mb-1"><i class="i-Calendar text-16 mr-1"></i> Total Balance</p>
                                        <span>{{totalBalance}} USD</span>
                                    </div>
                                    <div class=" mb-30">
                                        <p class="text-primary mb-1"><i class="i-Calendar text-16 mr-1"></i> Klayswap APY</p>
                                        <span>0.00%</span>
                                    </div>   
                                </div>
                                <div class="col-md-4 col-6">
                                    <div class=" mb-30">
                                        <p class="text-primary mb-1"><i class="i-MaleFemale text-16 mr-1"></i> Klaytn </p>
                                        <span>{{KlayBalance}} KLAY</span>  <span>≈ {{KlayUsdt}} USD </span> 
                                    </div>
                                     <div class=" mb-30">
                                        <p class="text-primary mb-1"><i class="i-Face-Style-4 text-16 mr-1"></i> Total LP Value</p>
                                        <span>토탈</span>
                                    </div>
                                </div>
                                <div class="col-md-4 col-6">
                                    <div class=" mb-30">
                                        <p class="text-primary mb-1"><i class="i-Face-Style-4 text-16 mr-1"></i> Total LP Value</p>
                                        <span>000000</span>
                                    </div>
                                    <div class=" mb-30">
                                        <p class="text-primary mb-1"><i class="i-Face-Style-4 text-16 mr-1"></i> Total LP Value</p>
                                        <span>000000</span>
                                    </div>
    
                                </div>
                            </div>
                            <hr>
                            <h4>Total Balance</h4>
                            <vue-good-table
                                :columns="totalColumns"
                                :search-options="{
                                    enabled: true,
                                    placeholder: 'Search this table'
                                }"
                                styleClass="tableOne vgt-table"
                                :rows="totalData">
                            </vue-good-table>
                            <br><hr>
                            <h4>In wallet</h4>
                            <vue-good-table
                                :columns="totalColumns"
                                :search-options="{
                                    enabled: true,
                                    placeholder: 'Search this table'
                                }"
                                styleClass="tableOne vgt-table"
                                :rows="walletData">
                            </vue-good-table>
                            <br><hr>
                            <h4>LP Balance</h4>
                            __accountData.response.lpBalance--
                            {{lpBalance}}
                            <br><hr>
                            <h4>Pending Rewards</h4>
                            __accountData.response.pendingRewards--
                            {{pendingRewards}}
                            <br><hr>
                        </b-tab>
                        <b-tab title="Actions">
                            <b-row>
                                <b-col md="3">
                                    <b-card class="card-profile-1 mb-30 text-center">
                                        <h5 class="m-0">Action button 1</h5>
                                        <p class="mt-0">무언가 하기</p>
                                        <p>descdesc desc descdescdescdesc descdesc</p>
                                        <button class="btn btn-primary btn-rounded" @click="goTest()">Action1</button>
                                    </b-card>
                                </b-col>
                                <b-col md="3">
                                    <b-card class="card-profile-1 mb-30 text-center">
                                        <h5 class="m-0">Action button 2</h5>
                                        <p class="mt-0">무언가 하기</p>
                                        <p>descdesc desc descdescdescdesc descdesc</p>
                                        <button class="btn btn-primary btn-rounded">Action1</button>
                                    </b-card>
                                </b-col>
                                <b-col md="3">
                                    <b-card class="card-profile-1 mb-30 text-center">
                                        <h5 class="m-0">Action button 3</h5>
                                        <p class="mt-0">무언가 하기</p>
                                        <p>descdesc desc descdescdescdesc descdesc</p>
                                        <button class="btn btn-primary btn-rounded">Action1</button>
                                    </b-card>
                                </b-col>
                            </b-row>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'Account',
        created() {
            //this.accountName = this.$route.query.address
            //this.getAccountBalance(this.accountName)
        },
        data() { 
            return {
                address:"",
                searchAddress:"",
                totalUsdt:0,
                KlayBalance:0,
                KlayUsdt:0,
                lpBalance:"",
                pendingRewards:"",
                
                accountName: null,
                accountData: [],
                totalColumns: [
                    {
                        label: "Symbol",
                        field: "symbol"
                    },
                    {
                        label: "갯수",
                        field: "balance"
                    },
                    {
                        label: "자산(USD)",
                        field: "priceUsdt"
                    }
                 ],
                totalData: [],
                walletData: []
                }; 
        },
        methods: {
            // getAccountBalance(accountName) {
            //     axios.get("/web/account/balance/"+accountName)
            //     .then((res) => {
            //         if(res.data.success == false){
            //             alert('잘못된 주소입니다.')
            //             this.$router.go(-1)
            //         }else{
            //             this.accountData = res.data
            //             this.totalData = res.data.response.totalBalance
            //             this.walletData = res.data.response.tokenBalance
            //             this.totalUsdt = res.data.response.totalUsdt
            //         }
            //         console.log('proxyRequest res', res)
            //     })
            //     .catch((error) => {                    
            //         this.accountData = "Error"
            //         console.log('proxyRequest error', error)
            //     })
            // },
            // goTest(){
            //     this.$router.push("myTest").catch(()=>{});
            // },
            /**
             * 
             */
            searchInputAddress() {
                //this.$router.push({name:"account", query: {address:address}}).catch(()=>{});
                var adr = this.searchAddress.trim()

                //유효성 검사(임시) 42자리, 0x로시작
                let length = adr.length
                if(length!=42){
                    //주소길이에러
                    alert("length error");
                }else if(adr.substr(0,2)!="0x") {
                    //주소형식에러
                    alert("invalid kalytn address");
                }else{
                    //맞는주소
                    axios.get("/web/account/balance/"+adr)
                    .then((res) => {
                        if(res.data.success == false){
                            alert('잘못된 주소입니다.')
                            this.$router.go(-1)
                        }else{
                            this.KlayBalance = (res.data.response.totalBalance[0].balance).toFixed(3) //총 클레이 갯수
                            this.KlayUsdt = (res.data.response.totalBalance[0].priceUsdt).toFixed(3)  //총 클레이 갯수 달러환산
                            this.totalBalance = (res.data.response.totalUsdt).toFixed(3) //총 자산 $
                            this.totalData = res.data.response.totalBalance //totalBalance테이블
                            this.walletData = res.data.response.tokenBalance //InWallet테이블
                            this.lpBalance = res.data.response.lpBalance
                            this.pendingRewards = res.data.response.pendingRewards
                            this.address = adr

                        }
                        console.log('proxyRequest res', res)
                    })
                    .catch((error) => {                    
                        this.accountData = "Error"
                        console.log('proxyRequest error', error)
                    })
                }

            }
        }

        
    }
</script>