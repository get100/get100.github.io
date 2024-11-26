import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/register',
      component: () => import('../views/auth/Register.vue')
    },
    {
      path: '/merchant',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true, role: 'merchant' },
      children: [
        {
          path: 'products',
          component: () => import('../views/merchant/Products.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/merchant/Orders.vue')
        }
      ]
    },
    {
      path: '/influencer',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true, role: 'influencer' },
      children: [
        {
          path: 'products',
          name: '选品中心',
          component: () => import('../views/influencer/Products.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/influencer/Orders.vue')
        },
        {
          path: 'tiktok',
          component: () => import('../views/influencer/TikTok.vue')
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
    return
  }
  
  if (to.meta.role && authStore.user?.role !== to.meta.role) {
    next('/')
    return
  }
  
  next()
})

export default router 