export default [
  {
    path: '/login',
    component: '@/pages/login/login',
    title: '登录',
  },
  {
    path: '/register',
    component: '@/pages/register/register',
    title: '注册',
  },
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      { path: '/', redirect: '/home', hideInMenu: true },
      { path: '/home', component: '@/pages/index', hideInMenu: true },
      {
        title: '用户管理',
        routes: [
          {
            title: '用户列表',
            path: '/userManage/userManage',
            component: '@/pages/userManage/userManage',
          },
          {
            path: '/userManage/personInfor',
            component: '@/pages/userManage/personInfor/personInfor',
            hideInMenu: true,
          },
        ],
      },
    ],
  },
];
