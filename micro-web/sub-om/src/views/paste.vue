<template>
  <input type="text" ref="paste">
</template>

<script>
export default {
  mounted () {
    this.initPaste()
  },
  beforeUnmount () {
    this.pasteDom?.removeEventListener('paste', this.handler)
  },
  methods: {
    initPaste () {
      this.pasteDom = this.$refs.paste
      this.handler = event => {
        // 黏贴版没有数据,则直接结束
        if (!event.clipboardData?.items?.length) {
          return
        }
        // 黏贴版数据项,是个数组
        const item = event.clipboardData.items[0]
        // 判断是文本还是图片文件
        if (item.kind == 'file') {
          // 获取文件
          let file = item.getAsFile()
          console.log("initPaste -> file", file)
        }
        event.preventDefault()
      }
      this.pasteDom?.addEventListener('paste', this.handler)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>