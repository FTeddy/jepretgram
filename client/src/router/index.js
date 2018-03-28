import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Recent from '@/components/Recent'
import List from '@/components/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/recent',
      component: Recent,
      children: [
        {
          path: 'list',
          name: 'List',
          component: List
        }
      ]
    }
  ]
})
