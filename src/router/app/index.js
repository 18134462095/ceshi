import index from './modules'
import home from './modules/home'
import detail from './modules/detail'
import mall from './modules/mall'
import my from './modules/my'
export default {
  path: '/app', // app
  name: 'App',
  component: resolve => require(['@/views/app/userApp'], resolve),
  children: [
    ...index,
    ...home,
    ...detail,
    ...mall,
    ...my,
    {
      name: 'AppIfm',
      path: '/app/ifm',
      component: resolve => require(['@/views/app/appIfm'], resolve)
    },
    {
      path: '/app/*',
      redirect: index[0].path
    }
  ],
}