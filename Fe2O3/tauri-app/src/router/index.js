import { createRouter, createWebHistory } from 'vue-router'
import { N1 } from './auth'
const basicRoutes = [
  { path: '/', name: 'home', component: () => import('@/view/home.vue') },
  { path: '/css', name: 'css', component: () => import('@/view/css.vue') },
  { path: '/sse', name: 'sse', component: () => import('@/view/sse.vue') },
  { path: '/neurasthenia', name: 'neurasthenia', component: () => import('@/view/neurasthenia') }
]

const RouteN1 = [
  { path: '/tiny', name: 'tiny', auth: N1, component: () => import('@/view/tiny.vue') }
]

const dynamicRoutes = [...RouteN1]

const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes
})

export const updateRoutes = (authCodes = []) => {
  dynamicRoutes.forEach(route => {
    if (authCodes.includes(route.auth)) {
      router.addRoute(route)
    }
  })
  return router.getRoutes()
}

export const removeRoutes = (name) => {
  const oldRoutes = router.getRoutes()
  oldRoutes.forEach(route => {
    router.removeRoute(route.name)
  })
  basicRoutes.forEach(route => {
    router.addRoute(route)
  })
  router.push({ name: 'home' })
}

export const getRoutes = () => router.getRoutes()

export default router
