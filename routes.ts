
export default [
  { 
    path: '/login',
    component: '@/pages/login/login',
    // 不展示顶栏
    headerRender: false,
    // 不展示页脚
    footerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
  },
  { path: '/', component: '@/pages/index' },
  { 
    name: '用户管理',
    routes: [
      { name: '用户列表', path: '/userManage/userManage', component: '@/pages/userManage/userManage' }
    ]
  },
]
