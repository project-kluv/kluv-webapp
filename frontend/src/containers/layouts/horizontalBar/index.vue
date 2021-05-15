<template>
  <div class="app-admin-wraps layout-sidebar-large clearfix">
    <top-nav />
    <sub-header />

    <main>
      <div class="main-content-wrap horizontalbar-content d-flex flex-column flex-grow-1">
        <transition name="page" mode="out-in">
          <router-view />
        </transition>

        <div class="flex-grow-1"></div>
        <appFooter />
      </div>
    </main>
  </div>
</template>

<script>
import TopNav from "./TopNav";
import SubHeader from "./SubHeader";
import appFooter from "../common/footer";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TopNav,
    SubHeader,
    appFooter,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties"]),
  },
  methods: {},
};
</script>
<style lang="scss">
.horizontalbar-content {
  margin-top: 133px !important;
}
</style>