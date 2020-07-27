const routes = [
  { path: '/', component: () => import('pages/login.vue') },
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        name: 'home',
        path: '/home',
        component: () => import('components/home/home.vue')
      },
      { path: '/details', component: () => import('pages/details.vue') },
      {
        path: '/customer_management',
        component: () => import('pages/customer_management.vue')
      },
      {
        path: '/change_request',
        component: () => import('pages/change_request.vue')
      },
      { path: '/my_profile', component: () => import('pages/my_profile.vue') },
      { path: '/category', component: () => import('pages/category.vue') }
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
