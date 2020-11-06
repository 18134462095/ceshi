import index from './modules'

export default {
  path: '/manager', // app
  name: 'Manager',
  component: resolve => require(['@/views/manager/index'], resolve),
  children: [
    ...index,
    {
      path: '/manager/*',
      redirect: '/manager'
    }
  ],
  beforeEnter: (to, from, next) => {
    /**
     * 判定是否后台登录过
     * if(登陆过){
     *  如果登录过就跳转  管理页面   next('home')
     * } else {
     *  没有登录过跳转    登录页     next('login')
     * }
     * 上面的逻辑写出来之后  下面这个next()删掉
     */
    next()
  }
}