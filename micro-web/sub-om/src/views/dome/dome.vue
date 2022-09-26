<template>
  <div>
    <div v-for="item in list" :key="item.pageName" @click="jump(item)">{{item.title}}</div>
  </div>
</template>

<script>
import getpage from './code';
export default {
  data () {
    return {
      code: 'ebsCH6868768FA',
      list: []
    }
  },
  created () {
    this.list = getpage(this.code)
  },
  methods: {
    jump ({ pageName, attrName }) {
      console.log({
        pageName,
        [attrName]: this.code
      })

    }
  }
}
</script>

<style lang="scss" scoped>
</style>