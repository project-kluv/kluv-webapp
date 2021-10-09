// import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import VueRouter from "vue-router";
import GullKit from "./plugins/gull.kit";
// import "babel-polyfill";
// import es6Promise from "es6-promise";
// es6Promise.polyfill();
import store from "./store";
import Breadcumb from "./components/breadcumb";
// import firebase from "firebase/app";
// import "firebase/auth";
// import {firebaseSettings} from "@/data/config";
import i18n from "./lang/lang";
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
//import material-icon scss
import "font-awesome/css/font-awesome.min.css";
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import VueGtag from 'vue-gtag'




//defined as global component
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);

Vue.component("breadcumb", Breadcumb);
import InstantSearch from 'vue-instantsearch';
// Vue.use(VueRouter);
 

Vue.use(VueGtag, {
  config: {
      id: 'G-VX1TCGQR4H'  // Google Analytics의 Tracking ID를 넣어준다
  }
});
Vue.use(InstantSearch);
Vue.use(GullKit);

// firebase.initializeApp(firebaseSettings);



Vue.config.productionTip = false;

Vue.use(BootstrapVueIcons);

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
