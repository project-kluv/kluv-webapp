<template>
  <div class="main-header">
    <div style="font-size:20px;" class="logo">
      <center>KLUV.me</center>
      <!-- <img src="@/assets/images/logo1.png" style="width:45%; height:45%;" alt /> -->
    </div>

    <div @click="sideBarToggle" class="menu-toggle">
      <div></div>
      <div></div>
      <div></div>
    </div>


    <div style="margin: auto"></div>

    <div class="header-part-right">

      <!-- search bar -->
      <!-- <div class="search-bar">
        <input type="text" placeholder="Search address" @keyup.enter="searchInputAdress(address)" v-model="address"/>
        <i class="search-icon text-muted i-Magnifi-Glass1" @click="searchInputAdress(address)"></i>
      </div> -->
      <!-- search bar end -->
      <!-- Full screen toggle -->
      <i
        class="i-Full-Screen header-icon d-none d-sm-inline-block"
        @click="handleFullScreen"
      ></i>
      <!-- <i class="i-Full-Screen header-icon d-none d-sm-inline-block" data-fullscreen></i> -->
      <!-- Grid menu Dropdown -->

      <!-- dark mode -->
      <i class="header-icon" @click="changeThemeMode"><b-icon icon="moon"></b-icon></i>
      <!-- dark mode End -->

      <!-- User avatar dropdown -->
      <div class="dropdown">
        <b-dropdown
          id="dropdown-1"
          text="Dropdown Button"
          class="m-md-2 user col align-self-end"
          toggle-class="text-decoration-none"
          no-caret
          variant="link"
        >
          <template slot="button-content">
            <img
              src="@/assets/images/faces/4.jpg"
              id="userDropdown"
              alt
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
          </template>

          <div class="dropdown-menu-right" aria-labelledby="userDropdown">
            <div class="dropdown-header">
              <i class="i-Lock-User mr-1"></i> 이름
            </div>
            <a class="dropdown-item">계정설정</a>
            <a class="dropdown-item" href="#" @click.prevent="logoutUser"
              >로그아웃</a
            >
          </div>
        </b-dropdown>
      </div>
    </div>
    <!-- <search-component
      :isSearchOpen.sync="isSearchOpen"
      @closeSearch="toggleSearch"
    ></search-component> -->
  </div>

  <!-- header top menu end -->
</template>
<script>
import Util from "@/utils";
import Sidebar from "./Sidebar";
//import searchComponent from "../common/search";
import { isMobile } from "mobile-device-detect";
import { mapGetters, mapActions } from "vuex";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],
  components: {
    //searchComponent,
    Sidebar
  },

  data() {
    return {
      address:'',
      isDisplay: true,
      isStyle: true,
      isSearchOpen: false,
      isMouseOnMegaMenu: true,
      isMegaMenuOpen: false
    };
  },
  mounted() {
    // document.addEventListener("click", this.closeMegaMenu);
  },
  computed: {
    ...mapGetters(["getSideBarToggleProperties"])
  },

  methods: {
    ...mapActions([
      "changeSecondarySidebarProperties",
      "changeSidebarProperties",
      "changeThemeMode",
      "signOut",
    ]),

    connectKaikas() {
      console.log("kaikas connect")
      window.klaytn.enable().then(response => {
        this.address = response[0]
        console.log(this.address)
      })      
    },

    // megaMenuToggle() {
    //   this.isMegaMenuOpen = false;

    //   console.log("work");
    // },

    handleFullScreen() {
      Util.toggleFullScreen();
    },
    logoutUser() {
      this.signOut();

      this.$router.push("/app/sessions/signIn");
    },

    closeMegaMenu() {
      this.isMegaMenuOpen = false;
      // console.log(this.isMouseOnMegaMenu);
      // if (!this.isMouseOnMegaMenu) {
      //   this.isMegaMenuOpen = !this.isMegaMenuOpen;
      // }
    },
    toggleMegaMenu() {
      this.isMegaMenuOpen = !this.isMegaMenuOpen;
    },

    searchInputAdress(address) {
      // this.$router.push({path:"/app/pages/account", params: {address:address}});
      this.$router.push({name:"account", query: {address:address}}).catch(()=>{});
      // const router = new VueRouter({
      //   routes: [
      //     { path: '/faq', redirect: { adress: address }}
      //   ]
      // })
      // alert(address)
    },


    sideBarToggle(el) {
      if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        isMobile
      ) {
        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
      } else if (
        this.getSideBarToggleProperties.isSideNavOpen &&
        this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {
        this.changeSecondarySidebarProperties();
      } else if (this.getSideBarToggleProperties.isSideNavOpen) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen &&
        !this.getSideBarToggleProperties.isActiveSecondarySideNav
      ) {
        this.changeSidebarProperties();
      } else if (
        !this.getSideBarToggleProperties.isSideNavOpen &&
        !this.getSideBarToggleProperties.isSecondarySideNavOpen
      ) {
        // console.log("4");

        this.changeSidebarProperties();
        this.changeSecondarySidebarProperties();
        // console.log("4");
      }
    }
  }
};
</script>



