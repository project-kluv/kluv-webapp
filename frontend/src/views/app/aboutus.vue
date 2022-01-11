<template>
  <div class="main-content">
    <breadcumb :page="'Who We Are'" :folder="'About us'" />
    <b-row>
      <!-- widget-chart--bar phase-3 -->
          <b-col md="3">
            <b-card class="card-profile-1 mb-30 text-center">
              <div class="avatar box-shadow-2 mb-3">
                <img src="@/assets/images/profile/leafcat.png" alt="" />
              </div>
              <h5 class="m-0">Leafcat</h5>
              <p class="mt-0 text-muted">SW Architect / Full stack developer</p>
              <p>
              </p>
            </b-card>
          </b-col>
          <b-col md="3">
            <b-card class="card-profile-1 mb-30 text-center">
              <div class="avatar box-shadow-2 mb-3">
                <img src="@/assets/images/profile/kerin.png" alt="" />
              </div>
              <h5 class="m-0">Kerin</h5>
              <p class="mt-0 text-muted">UX / Frontend / Bot developer</p>
            </b-card>
          </b-col>
          <b-col md="3">
            <b-card class="card-profile-1 mb-30 text-center">
              <div class="avatar box-shadow-2 mb-3">
                <img src="@/assets/images/profile/noname.png" alt="" />
              </div>
              <h5 class="m-0">To be announced</h5>
              <p class="mt-0 text-muted">Financial specialist</p>
            </b-card>
          </b-col>
          <b-col md="3">
            <b-card class="card-profile-1 mb-30 text-center">
              <div class="avatar box-shadow-2 mb-3">
                <img src="@/assets/images/profile/jason.jpg" alt="" />
              </div>
              <h5 class="m-0">Jason</h5>
              <p class="mt-0 text-muted">Marketing Expert</p>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
           <b-col lg="12" xl="12" class=" mb-30">
              <b-card>
                <i class="i-Gift-Box"></i> Open source is awesome!  <br>
                <i class="i-Unlike"></i> <strong> But, copy is awful </strong>
              </b-card>
           </b-col>




        </b-row>
  </div>
</template>
<script>
export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "About us"
  },
  methods: {
    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },

    clip(){
      const t = document.createElement("textarea")
      document.body.appendChild(t)
      t.value = '0xB55d37D4D42437E72E9D55e3Ac37ae6c1bfcF444'
      t.select()
      document.execCommand('copy')
      document.body.removeChild(t)

      this.makeToast("success", "복사가 완료되었습니다.");


    
    }
  }
};
</script>
