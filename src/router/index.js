import Vue from 'vue'
import Router from 'vue-router'
import Quote from '@/components/Quote'
import HallOfFame from '@/components/HallOfFame'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'quote',
      component: Quote
    },
    {
      path: '/hof',
      name: 'hof',
      component: HallOfFame,
    }
  ]
})
