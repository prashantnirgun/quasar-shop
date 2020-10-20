const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        name: 'test',
        path: '/test',
        component: () => import('pages/Test.vue')
      },
      {
        name: 'home',
        path: '/',
        component: () => import('components/home/Index.vue')
      },
      {
        path: '/confirmation',
        name: 'confirmation',
        component: () => import('pages/Confirmation.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('pages/Orders.vue')
      },
      {
        path: '/city',
        name: 'city',
        component: () => import('pages/City.vue')
      },
      {
        path: '/change_request',
        component: () => import('pages/change_request.vue')
      },
      {
        path: '/profile',
        component: () => import('components/auth/UserProfile.vue')
      },
      {
        name: 'category',
        path: '/category/:category_slug',
        component: () => import('components/category/Index.vue')
      },
      {
        name: 'product',
        path: '/product/:slug',
        component: () => import('components/product/Index.vue')
      },
      {
        name: 'cart',
        path: '/cart',
        component: () => import('components/cart/Cart.vue')
      },
      {
        name: 'shopping-cart',
        path: '/shopping-cart',
        component: () => import('components/cart/ShoppingCart.vue')
      },
      {
        name: 'device',
        path: '/device',
        component: () => import('pages/Device.vue')
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
