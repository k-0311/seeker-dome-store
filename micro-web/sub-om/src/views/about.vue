<template>
  <div class="about">
    <h1 @click="sendRequest">click request</h1>
    <!-- <div>{{x}}, {{y}}</div> -->
  </div>
</template>

<script>
// import { useMousePosition } from '@/hooks/mouse';
import request from '@/utils/ioc/ioc-request';
export default {
  setup () {
    // const { x, y } = useMousePosition()
    // return { x, y }
    const sendRequest = async () => {
      await request.get('https://jsonplaceholder.typicode.com/todos/1')
    }
    return {
      sendRequest
    }
  }
}
</script>
<style scoped>
h1 {
  user-select: none;
}
</style>