import { N1, V2, T3 } from './auth';

export const basicRoutes = [
  { path: '/', name: 'home', component: () => import(/* webpackChunkName: "home" */ '@/views/home') },
  { path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ '@/views/about') },
  { path: '/model', name: 'model', component: () => import(/* webpackChunkName: "model" */ '@/views/model') }
];

const RouteN1 = [
  { path: '/labs', name: 'labs', auth: N1, component: () => import(/* webpackChunkName: "labs" */ '@/views/labs') },
  { path: '/gzip', name: 'gzip', auth: N1, component: () => import(/* webpackChunkName: "gzip" */ '@/views/gzip') },
  { path: '/blob', name: 'blob', auth: N1, component: () => import(/* webpackChunkName: "blob" */ '@/views/blob') },
  { path: '/css', name: 'css', auth: N1, component: () => import(/* webpackChunkName: "css" */ '@/views/css') },
]
const RouteK2 = [
  { path: '/online', name: 'online', auth: V2, component: () => import(/* webpackChunkName: "online" */ '@/views/online') },
  { path: '/keyboard', name: 'keyboard', auth: V2, component: () => import(/* webpackChunkName: "keyboard" */ '@/views/keyboard') },
]
const RouteT3 = [
  { path: '/dark', name: 'dark', auth: T3, component: () => import(/* webpackChunkName: "dark" */ '@/views/dark') },
  { path: '/capsule', name: 'capsule', auth: T3, component: () => import(/* webpackChunkName: "capsule" */ '@/views/capsule') },
  { path: '/autox6', name: 'autox6', auth: T3, component: () => import(/* webpackChunkName: "x6" */ '@/views/autox6/x6') },
  { path: '/paste', name: 'paste', auth: T3, component: () => import(/* webpackChunkName: "x6" */ '@/views/paste') }
]

export const dynamicRoutes = [...RouteN1, ...RouteK2, ...RouteT3]
export const addRoutes = (router, permission = []) => {
  dynamicRoutes.forEach(route => {
    if (permission.includes(route.auth)) {
      router.addRoute(route)
    }
  })
}

export default basicRoutes;