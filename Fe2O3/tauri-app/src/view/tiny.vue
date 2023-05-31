<template>
  <div class="zip-window" @dragenter="dragenterEvent" @dragover="dragoverEvent" @dragleave="dragleaveEvent"
    @drop="dropEvent">
    <div />
  </div>
</template>

<script setup>

const dragenterEvent = (event) => {
  event.stopPropagation()
  event.preventDefault()
}
const dragoverEvent = (event) => {
  event.stopPropagation()
  event.preventDefault()
}
const dragleaveEvent = (event) => {
  event.stopPropagation()
  event.preventDefault()
}
const dropEvent = (event) => {
  event.stopPropagation()
  event.preventDefault()
  const files = event.dataTransfer.files
  console.log('dropEvent -> files', files)
  // displayChsFile(files);
}
</script>

<style lang="stylus" scoped>
  .zip-window
    margin 30px auto 0
    width 80vw
    height 60vw
    border: 1px dashed #aaa
    border-radius: 8px
</style>
