 <template>
  <div class="footer_wrap">
    <!-- Footer Start -->
    <div class="flex-grow-1"></div>
    <div class="app-footer">
      <strong>Disclaimer : 본 사이트에 등재된 모든 프로젝트는 안전성을 보장하지 않으며, 사용 혹은 투자에 따른 책임은 전적으로 사용자에게 있습니다.</strong>
      <br>
      Donate Klaytn Address : <span class="clickable" @click="clip();"><u>0xB55d37D4D42437E72E9D55e3Ac37ae6c1bfcF444</u></span>
      <!-- <div class="row"> -->
        <!-- <div class="col-md-9">
          <p><strong>Kluv.me</strong></p>
        </div> -->
      <!-- </div> -->
      <div
        class="footer-bottom border-top pt-3 d-flex flex-column flex-sm-row align-items-center"
      >
        <div class="d-flex align-items-center">
          <div style="">
              <!-- <p class="m-0">All rights reserved</p> -->
              <strong> Contact : contact@kluv.me | &copy; Kluv.me 2021-2022. All rights reserved</strong> 
          </div>
          <span class="flex-grow-1"></span>
        </div>
      </div>
      <!-- fotter end -->
    </div>
  </div>
</template> 
<script>



export default {
  data() {
    return {};
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


<style lang="scss" scoped>
</style> 