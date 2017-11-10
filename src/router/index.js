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
    path: "/login",
    name: "login",
    component: Pages.Login
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
      component: Pages.Games,
    },
    {
    path: "games/create",
    name: "creationGame",
    component: Pages.CreateGame
    },
    {
      path: "(teams/forming|teams/formed|teams/newteam)",
      name: "teams",
      component: Pages.Teams
    },
    {
      path: "team/:id",
      name: "team",
      component: Pages.Team,
      props: true
    },
    {
      path: "invites",
      name: "invites",
      component: Pages.Invites
    },
    {
      path: "invite/:id",
      name: "invite",
      component: Pages.Invite,
      props: true
    },
    {
      path: "matches",
      name: "matches",
      component: Pages.Matches
    }
    ]
  }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.state.security.accessToken == null) {
      next({
        path: '/login',
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
