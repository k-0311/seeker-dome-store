<template>
  <div class="about">
    <!-- <h1 @click="sendRequest">click request</h1> -->
    <!-- <div>{{x}}, {{y}}</div> -->
    <div v-for="(item,index) in list" :key="index">{{timeFormat(item.timestamp)}}</div>
  </div>
</template>

<script>
// import { useMousePosition } from '@/hooks/mouse';
import { reactive, nextTick, onUnmounted } from 'vue';
import request from '@/utils/ioc/ioc-request';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration)
export default {
  setup () {
    // const { x, y } = useMousePosition()
    // return { x, y }
    const sendRequest = async () => {
      await request.get('https://jsonplaceholder.typicode.com/todos/1')
    }


    const day = dayjs.duration(1000 * 3600 * 24 * 5 )
    console.log("setup -> day", day)


    const list = reactive(Array.from({ length: 5 }, () => ({ timestamp: Math.floor(Math.random() * 1000000) })))

    let timer = null

    nextTick(() => {
      timer = setInterval(() => {
        list.forEach(item => {
          item.timestamp -= 1
        })
      }, 1000)
    })

    onUnmounted(() => {
      clearInterval(timer)
    })


    return {
      sendRequest,
      list,
      timeFormat: timestamp => dayjs.duration(timestamp * 1000).format('DD HH:mm:ss')
    }
  }
}
</script>
<style scoped>
h1 {
  user-select: none;
}
</style>