<template>
  <div>
    <picture>
      <source media="(min-width: 600px)" srcset="">
      <img src="" alt="">
    </picture>
    <div class="loading" @click="loading"></div>
  </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
  setup () {
    const instance = getCurrentInstance()
    return {
      loading () {
        console.trace()
        instance.appContext.config.globalProperties.$loading({ title: 'aaaaaaaa' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
:root {
  color-scheme: light dark;
}
@media (prefers-color-scheme: dark) {
  :root {
  }
}
.loading {
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background-color: orange;
}
</style>