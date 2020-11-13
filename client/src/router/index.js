import Vue from 'vue'
import VueRouter from 'vue-router'
import vTable from '../components/v-table'
import vCreate from '../components/v-create'
import vUpdate from '../components/v-update'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'vTable',
    component: vTable
  },
  {
    path: '/create',
    name: 'vCreate',
    component: vCreate
  },
  {
    path: '/update/:id',
    name: 'vUpdate',
    component: vUpdate
  },
]

const router = new VueRouter({
  routes
})

export default router
