<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { onMounted, onUnmounted } from 'vue';
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  setup () {
    const logFn = (url, data) => {
      // navigator.sendBeacon(url, data) //详情见MDN [https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/sendBeacon]
    }

    onMounted(() => {
      window.addEventListener('unload', logFn, false)
    })
    onUnmounted(() => {
      window.removeEventListener('unload', logFn, false)
    })
  }
};
</script>