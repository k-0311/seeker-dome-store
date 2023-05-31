<script setup>
import { computed } from 'vue'
import { authStore } from '@/stores/auth'
const menus = computed(() => authStore().menus)
</script>

<template>
  <div class="header">
    <router-link :to="menu.path" v-for="menu in menus" :key="menu.name">{{ menu.name }} | </router-link>
  </div>
  <router-view />
</template>

<style scoped>
.header {
  text-align: center;
}
</style>
