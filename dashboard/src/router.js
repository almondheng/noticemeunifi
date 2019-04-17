import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: { name: 'home'}
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/topics',
      name: 'topics',
      component: () => import(/* webpackChunkName: "about" */ "./views/Topics.vue")
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import(/* webpackChunkName: "about" */ "./views/Archive.vue")
    }
  ]
})
