<template>
  <div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';

export default {
  props: {
    offlineTitle: {
      type: String,
      default: "网络已断开，请检查网络连接。",
    },
    onlineTitle: {
      type: String,
      default: "网络已连接",
    },
    desc: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 4.5,
    },
  },
  setup () {
    const eventHandle = event => {
      console.log(`network state %c${event.type}`, 'color:#f40')
    }
    const network = () => {
      if (!navigator?.connection) return
      console.log('%cinit network monitor', 'color:#f40')
      const connection = navigator.connection
      let type = connection.effectiveType
      connection.addEventListener('change', function () {
        console.log("网络状况从 " + type + " 切换至" + connection.effectiveType);
        type = connection.effectiveType;
      })
    }
    onMounted(() => {
      window.addEventListener('offline', eventHandle)
      window.addEventListener('online', eventHandle)
    })
    onUnmounted(() => {
      window.removeEventListener('offline', eventHandle)
      window.removeEventListener('online', eventHandle)
    })
    return {
      network
    }
  }
}
</script>

<style>
</style>
