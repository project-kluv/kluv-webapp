<template>
  <div class="main-content">
    <breadcumb :page="'Klaytn Portal'" :folder="'Portal'" />


    <!-- <b-row>
      <b-col lg="4" md="4" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Coin"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.2 mb-2 font-weight-bold">KLAY</p>
            <p class="text-muted text-15 line-height-1 mb-1">&#8361;{{klayKrwPriceExchange}}(Bithumb)</p>
            <p class="text-muted text-15 line-height-1 mb-1">${{swapKlayPriceUsd}}(Klayswap)</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="4" md="4" sm="12">
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
      <b-col lg="4" md="4" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Dollar"></i>
          <div class="content" style="max-width:120px;">
            <p class="text-primary text-20 line-height-1.5 mb-2 font-weight-bold">환율(USD)</p>
            <p class="text-muted text-22 line-height-1.1 mb-2">&#8361;{{usdKrw}}</p>
          </div>
        </b-card>
      </b-col>
    </b-row> -->
<b-row class="">
 <b-col lg="6" xl="6" class=" mb-30">
        <b-card>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                 <a href="https://t.me/kluvme" target="_blank" class="ul-widget2__title"><img src="@/assets/images/site/kluvme.png"/></a>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://t.me/kluvme" target="_blank" class="ul-widget2__title">
                     Join our telegram community!
                  </a>
                  <span class="ul-widget2__username">
                    KLUV.ME 텔레그램 커뮤니티에서 클레이튼 생태계의 모든 프로젝트 정보를 공유하고 자유로운 토론을 즐기세요!
                    <br>
                    신규 프로젝트 추가 요청, 기타 협력 제안 :contact@kluv.me
                  </span>
                </div>
                <div class="ul-widget4__img">
               <a href="https://t.me/kluvme" target="_blank"><img src="@/assets/images/site/telegram.png"/></a>
               </div>
              </div>
            </div>
          </div>
        </b-card>   
   </b-col>
</b-row>

    <b-row class="">
      <!-- authors-profit -->
      <b-col lg="3" xl="3" class=" mb-30">
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              Klaytn Family
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/klaytn.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://www.klaytn.com/" target="_blank" class="ul-widget2__title">
                    Klaytn
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://www.klaytn.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/KlaytnSouthKorea" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>

              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/krust.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://krustuniverse.com/" target="_blank" class="ul-widget2__title">
                    Krust
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://krustuniverse.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>

                <!-- <a href="" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a> -->
               <a></a>
              </div>

              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/groundx.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://www.groundx.xyz/"  target="_blank"  class="ul-widget2__title">
                    GroundX
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://www.groundx.xyz/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
        <br>
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              Block explorer
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/klaytnscope.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://v2.scope.klaytn.com/" target="_blank" class="ul-widget2__title">
                    Klaytnscope
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://v2.scope.klaytn.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
        <br>
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              Asset Bridge
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/orbit.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://bridge.orbitchain.io/" target="_blank" class="ul-widget2__title">
                    Orbit Bridge
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://bridge.orbitchain.io/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/Orbit_Chain" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" xl="3" class=" mb-30">
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              DEX
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/klayswap.svg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://klayswap.com/" target="_blank" class="ul-widget2__title">
                    Klayswap
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://klayswap.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/KLAYswapofficial" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>

              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/CLA.svg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://claimswap.org/" target="_blank" class="ul-widget2__title">
                    ClaimSwap
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://claimswap.org/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/claimswap" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>

              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/ufoswap.svg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://ufoswap.fi/" target="_blank" class="ul-widget2__title">
                    UFOSwap
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://ufoswap.fi/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/ufoswapnft" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>

              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/roundrobin.svg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://roundrobin.finance/" target="_blank" class="ul-widget2__title">
                    Roundrobin
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://roundrobin.finance/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/roundrobin_official" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>

              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/pala.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://pala.world/" target="_blank" class="ul-widget2__title">
                    Pala
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://pala.world/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/attention_pala" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>

              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/neuron.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://www.neuronswap.com/" target="_blank" class="ul-widget2__title">
                    Neuron
                  <b-badge pill variant="light m-2">High lisk</b-badge>
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://www.neuronswap.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/NEURONswap" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>
            </div>
          </div>
        </b-card>      
      </b-col>

      <b-col lg="3" xl="3" class=" mb-30">
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              Farm
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/klayfi.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://klayfi.finance/" target="_blank" class="ul-widget2__title">
                    KlayFi
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://klayfi.finance/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/klayfiofficial" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
        <br>
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              Stable Coin
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/kokoa.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://kokoa.finance/" target="_blank" class="ul-widget2__title">
                    Kokoa Finance
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://kokoa.finance/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://kokoa.finance/static/Kokoa.png" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>
            </div>

            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/kai.svg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://kaiprotocol.fi/" target="_blank" class="ul-widget2__title">
                    Kai Protocol
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://kaiprotocol.fi/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/kaiprotocol" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>
            </div>
          </div>
        </b-card>
        <br>
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              Stable Swap
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/i4i.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://i4i.finance/" target="_blank" class="ul-widget2__title">
                    i4i Finance
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://i4i.finance/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/i4iFinance_kr" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>
            </div>

            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/eklipse.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://eklipse.finance/" target="_blank" class="ul-widget2__title">
                    Eklipse
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://eklipse.finance/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/eklipsefinanceofficial" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>

      <b-col lg="3" xl="3" class=" mb-30">
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              Lending (Leverage)
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/donkey.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://www.donkey.fund/main" target="_blank" class="ul-widget2__title">
                    Donkey
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://www.donkey.fund/main" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/donkeyfund" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>
            </div>

            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/qubit.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://qbt.fi/app" target="_blank" class="ul-widget2__title">
                    Qubit
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://qbt.fi/app" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/QubitKorea" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>
            </div>

            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/kleva.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://qbt.fi/app" target="_blank" class="ul-widget2__title">
                    Kleva Protocol <b-badge pill variant="info m-2">wating</b-badge>
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://kleva.io/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/joinchat/DVU5RIt2pBQzMjVl" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>
            </div>

            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/klaybank.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://klaybank.org/" target="_blank" class="ul-widget2__title">
                    Klaybank <b-badge pill variant="info m-2">wating</b-badge>
                  </a>
                  <span href="#" class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://klaybank.org/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/Klaybank_KR" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
              </div>
            </div>
          </div>
        </b-card>
        <br>
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
             Asset Management 
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/bluewhale.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://bluewhale-protocol.com/" target="_blank" class="ul-widget2__title">
                    Bluewhale Protocol
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://bluewhale-protocol.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/bluewhale_protocol" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>

      <b-col lg="3" xl="3" class=" mb-30">
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              NFT Market
            </h3>
          </div>
          <div class="ul-widget__body">
              <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/opensea.svg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://opensea.io/" target="_blank" class="ul-widget2__title">
                    Opensea
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://opensea.io/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://discord.com/invite/opensea" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/klubs.svg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://klu.bs/" target="_blank" class="ul-widget2__title">
                    Klubs
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://klu.bs/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://open.kakao.com/o/gfsahfHd" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/pics.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://mypics.one/en" target="_blank" class="ul-widget2__title">
                    Mypics
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://mypics.one/en" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/PICS_Community" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
        <br>
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              NFT Maker
            </h3>
          </div>
          <div class="ul-widget__body">
              <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/krafterspace.svg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://www.krafter.space/" target="_blank" class="ul-widget2__title">
                    Krafterspace
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://www.krafter.space/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
          <div class="ul-widget__body">
              <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/mytems.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://mytems.io/" target="_blank" class="ul-widget2__title">
                    Mytems
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://mytems.io/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>

      <b-col lg="3" xl="3" class=" mb-30">
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              NFT Project
            </h3>
          </div>
          <div class="ul-widget__body">
              <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/dogesoundclub.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://dogesound.club/" target="_blank" class="ul-widget2__title">
                    Doge sound club
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://dogesound.club/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/dogesoundclub" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/metakongz.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://themetakongz.com/" target="_blank" class="ul-widget2__title">
                    Metakongz
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://themetakongz.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/the_metakongz" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
          
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/klapes.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://www.klapes.io/" target="_blank" class="ul-widget2__title">
                   Klapes
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://www.klapes.io/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://discord.com/invite/eVyrkTgX2P" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>

          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/newklaypunks.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://newklaypunksofficial.com/" target="_blank" class="ul-widget2__title">
                   Newklaypunks
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://newklaypunksofficial.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/+ISg4GThg0m5jYWRl" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>

          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/animalspunk.jpg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://animals-punks.com/animals-v2/index.html" target="_blank" class="ul-widget2__title">
                   Animals Punks v2
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://animals-punks.com/animals-v2/index.html" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://open.kakao.com/o/gnaiJczd" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>

          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/3space.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://3space.art/" target="_blank" class="ul-widget2__title">
                   3space Art
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://3space.art/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/threespaceart" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>

      <b-col lg="3" xl="3" class=" mb-30">
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              P2E Game
            </h3>
          </div>
          <div class="ul-widget__body">
              <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/klaymeta.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://klaymeta.io/" target="_blank" class="ul-widget2__title">
                    Klaymeta
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://klaymeta.io/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/klaymeta" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/klaycity.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://klaycity.com/" target="_blank" class="ul-widget2__title">
                    Klaycity <b-badge pill variant="info m-2">wating</b-badge>
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://klaycity.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://discord.com/invite/ksv5mxsRcx" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/kenome.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://klaygenome.com/" target="_blank" class="ul-widget2__title">
                    Kenome <b-badge pill variant="info m-2">wating</b-badge>
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://klaygenome.com/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/Kenome_official" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" xl="3" class=" mb-30">
        <b-card>
          <div class="d-flex justify-content-between">
            <h3 class="ul-widget__head-title">
              Chart
            </h3>
          </div>
          <div class="ul-widget__body">
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/dexata.svg"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://dexata.kr/" target="_blank" class="ul-widget2__title">
                    Dexata
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://dexata.kr/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/dexata" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
            <div class="ul-widget1">
              <div class="ul-widget__item ul-widget4__users">
                <div class="ul-widget4__img">
                  <img src="@/assets/images/site/tothem.png"/>
                </div>
                <div class="ul-widget2__info ul-widget4__users-info">
                  <a href="https://tothem.pro/" target="_blank" class="ul-widget2__title">
                    To The M
                  </a>
                  <span class="ul-widget2__username">
                  </span>
                </div>
                <a href="https://tothem.pro/" target="_blank"><span class="ul-widget4__number t-font-boldest text-info"><i class="i-Internet"></i></span></a>
                <a href="https://t.me/tothempro" target="_blank"><span class="ul-widget4__number t-font-boldest text-success"><i class="i-Speach-Bubbles"></i></span></a>
               <a></a>
              </div>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Klaytn Portal"
  }
};
</script>


