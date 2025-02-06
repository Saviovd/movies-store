import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import Checkout from '@/Views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/checkout',
    name: 'CheckoutView',
    component: Checkout
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
