// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import VueMaterial from "vue-material"
import VueResource from "vue-resource"

import "vue-material/dist/vue-material.css"

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueResource);

Vue.material.registerTheme("default", {
  primary: "teal",
  accent: "red",
  warn: "red",
  background: "white"
})

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  }
})