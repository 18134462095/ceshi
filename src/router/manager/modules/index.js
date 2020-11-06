/**
 * 后台管理进入系统前登录或者主页
 */
export default [
  {
    path: 'login',
    name: 'Mlogin',
    component: resolve => require(['@/views/manager/login'], resolve),
  },
  {
    path: 'home',
    name: 'Mhome',
    component: resolve => require(['@/views/manager/home'], resolve),
  },
  {
    path: 'homeDetail',
    name: 'HomeDetail',
    component: resolve => require(['@/views/manager/homeDetail'], resolve),
  },
  {
    path: 'agency/alogin',
    name: 'Alogin',
    component: resolve => require(['@/views/manager/agency/alogin'], resolve),
  },
  {
    path: 'agency/ahome',
    name: 'Ahome',
    component: resolve => require(['@/views/manager/agency/ahome'], resolve),
  },
]