export default {
  mode: 'history',
  base: 'station',
  routes: [
    {
      path: '*',
      redirect: '/warning'
    },
    {
      path: '/warning',
      name: 'Warning',
      component: () => import('@/pages/warning.vue'),
      meta: {title: '错误', requireAuth: false}
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/login.vue'),
      meta: {title: '登录', requireAuth: false}
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/layout.vue'),
      redirect: 'index',
      children:[
        {
          path: 'index',
          name: 'Index',
          component: () => import('@/pages/index.vue'),
          meta: {title: '油站信息', requireAuth: true},
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: () => import('@/pages/coupon.vue'),
          meta: {title: '油站优惠', requireAuth: true},
        },        
        {
          path: 'order',
          name: 'Order',
          component: () => import('@/pages/order.vue'),
          meta: {title: '订单信息', requireAuth: true},
        },          
        {
          path: 'detail/:id',
          name: 'Detail',
          component: () => import('@/pages/detail.vue'),
          meta: {title: '订单信息', requireAuth: true},
        },        
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/pages/dashboard.vue'),
          meta: {title: '数据概览', requireAuth: true},
        },
        {
          path: 'report',
          name: 'Report',
          component: () => import('@/pages/report.vue'),
          meta: {title: '报表导出', requireAuth: true},
        },
        {
          path: 'coupondetail/:id',
          name: 'Coupondetail',
          component: () => import('@/pages/coupondetail.vue'),
          meta: {title: '报表导出', requireAuth: true},
        },
        {
          path: 'grant/:id',
          name: 'Grant',
          component: () => import('@/pages/grant.vue'),
          meta: {title: '报表导出', requireAuth: true},
        }
      ]
    }
  ]
}
