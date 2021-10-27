<template>
  <solt>
    <div @click="$emit('update:nutone', Math.random())">
      <div>this is sub labs provide/inject: {{outfit}}</div>
      <div :class="myclass" :style="mystyle">aaaaaaaa</div>
    </div>
  </solt>
</template>

<script>
import { inject } from 'vue'
export default {
  inheritAttrs: false,
  emits: ['update:nutone', 'update:eggman'],
  setup (props, ctx) {
    console.log(ctx.attrs)
    return {
      outfit: inject('outfit'),
      myclass: ctx.attrs.class,
      mystyle: ctx.attrs.style
    }
  }
}
</script>

<style scoped>
div {
  user-select: none;
}
</style>