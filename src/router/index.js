import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 前台路由
  {
    path: '/',
    component: () => import('../views/FontView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductView.vue')
      },
      {
        path: 'cart',
        component: () => import('../views/CartView.vue')
      },
      {
        path: 'login',
        component: () => import('../views/LoginView.vue')
      }
    ]
  },
  // 後台路由
  {
    path: '/admin',
    component: () => import('../views/BackstageView.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/AdminProducts.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/AdminCoupon.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active'
})

export default router
