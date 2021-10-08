import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const DEFAULT_LANG = "kr";

const locales = {
  kr: require("./i18n/kr.json"),
  en: require("./i18n/en.json")
};
const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales
});

export default i18n;
