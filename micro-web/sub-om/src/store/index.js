import { createStore } from "vuex";
import { useRouter } from 'vue-router'
import { basicRoutes, dynamicRoutes } from '@/router';

export default createStore({
  state: {
    authCodes: [101, 201, 301],
    user: {
      id: 1,
      name: 'FL4R',
      permission: {
        'labs': 'CR',
        'gzip': 'SCVR'
      }
    }
  },
  mutations: {
    updateRoutes ({ authCodes }) {
      const router = useRouter()
      dynamicRoutes.forEach(route => {
        if (authCodes.includes(route.auth)) {
          router.addRoute(route)
        }
      })
    },
    removeRoutes () {
      const router = useRouter()
      const oldRoutes = router.getRoutes()
      oldRoutes.forEach(route => {
        router.removeRoute(route.name)
      })
      basicRoutes.forEach(route => {
        router.addRoute(route)
      })
      router.push({ name: 'home' })
    }
  },
  actions: {},
  modules: {},
});
