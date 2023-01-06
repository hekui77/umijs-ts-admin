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
      { path: '/', component: '@/pages/index', hideInMenu: true },
      {
        path: '/userManage/userManage',
        component: '@/pages/userManage/userManage',
        title: '用户管理',
        // icon: 'Study',
      },
      // {
      //   name: '用户管理',
      //   routes: [
      //     {
      //       name: '用户列表',
      //       path: '/userManage/userManage',
      //       component: '@/pages/userManage/userManage',
      //     },
      //   ],
      // },
    ],
  },
];
