const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        name: 'home',
        path: '/',
        component: () => import('components/home/Index.vue')
      },
      {
        path: '/customer_management',
        component: () => import('pages/customer_management.vue')
      },
      {
        path: '/change_request',
        component: () => import('pages/change_request.vue')
      },
      { path: '/my_profile', component: () => import('pages/my_profile.vue') },
      {
        name: 'products',
        path: '/products/:category_id',
        component: () => import('components/product/Index.vue')
      },
      {
        name: 'product-details',
        path: '/product-details/:product_id',
        component: () => import('components/product/product_details.vue')
      },
      {
        name: 'cart',
        path: '/cart',
        component: () => import('components/cart/Cart.vue')
      }
      // {
      //   path: '/dashboard',
      //   component: () => import('pages/dashboard.vue')
      // }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  });
}

export default routes;
