import { defineStore } from 'pinia'
import { updateRoutes, removeRoutes, getRoutes } from '@/router'

export const authStore = defineStore('auth', {
  state: () => ({
    authCodes: [],
    menus: getRoutes()
  }),
  actions: {
    updateMenus () {
      this.menus = updateRoutes(this.authCodes)
    },
    clearMenus () {
      removeRoutes()
      this.menus = getRoutes()
    }
  }
})
