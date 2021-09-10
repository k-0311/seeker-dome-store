import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

// const Modules = [
//   require.context('./components/global', true, /\.vue$/),
//   require.context('./components', true, /\.vue$/),
// ]

const reqCtx = require.context('VIEWS', true, /^.(?!\/ignore\/).*\.vue$/, 'lazy')
// const reqCtx = require.context('VIEWS', true, /.*\.vue$/,'lazy')

const routes = reqCtx.keys().map(fileName => {
  let path = fileName.replace(/(\.)(.*)(\.vue)$/, '$2').toLocaleLowerCase()
  let name = fileName.replace(/(.*\/)(\w*)(\.vue)$/, '$2')
  return {
    path: name.toLocaleLowerCase() == 'home' ? '/' : path,
    name,
    component: () => reqCtx(fileName)
  }
})

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...routes, {
    path: '/aaa/:id',
    name: 'aaa',
    /*
      webpackChunkName 是为预加载的文件取别名
      webpackPrefetch: true 会在浏览器闲置下载文件，优化了子页面加载的速率
      webpackPreload: true 会在父 chunk 加载时 '并行' 下载文件【错误的使用webpackPreload实际上会影响性能，因此要谨慎使用】
    */
    component: () => import(/* webpackChunkName: "Ignore/aaa" */'VIEWS/ignore/aaa.vue'),
    props: true
  }]
})

router.beforeEach((to, from, next) => {
  store.commit('setPLST', new Date() - 0)
  next()
})

export default router
