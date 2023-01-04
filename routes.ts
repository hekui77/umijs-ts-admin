export default [
  {
    path: '/login',
    component: '@/pages/login/login',
  },
  {
    path: '/register',
    component: '@/pages/register/register',
  },
  { path: '/', component: '@/pages/index' },
  {
    name: '用户管理',
    routes: [
      {
        name: '用户列表',
        path: '/userManage/userManage',
        component: '@/pages/userManage/userManage',
      },
    ],
  },
];
