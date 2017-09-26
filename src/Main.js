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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('auth-token') == null) {
      next({
        path: '/signin',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
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
