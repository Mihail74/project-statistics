import Vue from "vue"
import Router from "vue-router"
import Pages from "@/pages"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: {
        path: '/signin'
      }
    },

    {
      path: "/signin",
      name: "signin",
      component: Pages.SignIn,
    },

    {
      path: "/pages",
      component: Pages.Layout,

      meta: {
        requiresAuth: true
      },

      children: [{
        path: "games",
        name: "games",
        component: Pages.Games
      }]
    }
  ]
})
