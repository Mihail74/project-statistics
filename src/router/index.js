import Vue from "vue";
import Router from "vue-router";
import Pages from "@/pages";
import store from "@/store";

Vue.use(Router);

let router = new Router({
  routes: [{
      path: '/',
      redirect: { path: '/pages/games' }
    },

    {
      path: "/signin",
      name: "signin",
      component: Pages.SignIn
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
      },
        {
          path: "(teams/forming|teams/formed)",
          name: "teams",
          component: Pages.Teams
      }]
    }]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.security.accessToken == null) {
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
});

export default router;
