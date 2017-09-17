import Vue from 'vue'
import Router from 'vue-router'
import Pages from '@/pages'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/games',
    name: 'games',
    component: Pages.Games
  }]
})
