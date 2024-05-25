import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';
import IndexPage from '@/pages/indexPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: IndexPage
  },
  {
    path: "/:category",
    component: IndexPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
