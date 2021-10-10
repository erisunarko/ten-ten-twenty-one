const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('pages/login/Login.vue'),
  },
  {
    name: 'Home',
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'post', name: 'Post', component: () => import('pages/post/Post.vue') },
      { path: 'post/:id?/edit', name: 'PostEdit', component: () => import('pages/post/Post.vue') },
      { path: 'post/modify', name: 'PostCreate', component: () => import('pages/post/PostModify.vue') },
      { path: 'admin', name: 'Admin', component: () => import('pages/admin/Admin.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
