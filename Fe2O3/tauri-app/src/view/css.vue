<template>
  <div class="aspect-ratio minmax">
    <div class="min-area">min area</div>
    <div class="auto-area" @click="reqTest">auto area</div>
  </div>
  <div id="ggk" ref="ggkDom">
    <div class="jp">给你一兜比</div>
    <canvas ref="canvas" id="canvas" width="400" height="100"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const ggkDom = ref(null)
const canvas = ref(null)
const isDraw = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  ctx.fillStyle = 'darkgray'
  ctx.fillRect(0, 0, 400, 100)

  canvas.value.onmousedown = function () {
    isDraw.value = true
  }

  canvas.value.onmousemove = function (e) {
    if (isDraw.value) {
      const x = e.pageX - ggkDom.value.offsetLeft + ggkDom.value.offsetWidth / 2
      const y = e.pageY - ggkDom.value.offsetTop
      ctx.beginPath()
      ctx.arc(x, y, 30, 0, 2 * Math.PI)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fill()
      ctx.closePath()
    }
  }

  document.onmouseup = function () {
    isDraw.value = false
  }
})

</script>

<style lang="stylus" scoped>
.aspect-ratio
  margin 0 auto
  width 500px
  aspect-ratio 16 / 9
  resize both
  overflow auto
.minmax
  display grid
  grid-template-columns minmax(150px, 25%) 1fr
.min-area
  display grid
  place-items center
  background-color #FAE5AD
.auto-area
  display grid
  place-items center
  background-color #D0E4A8
// =======================
#ggk
  width 400px
  height 100px
  position relative
  left 50%
  transform translate(-50%, 0)
  .jp, #canvas
    position absolute
    width 400px
    height 100px
    left 0
    top 0
    text-align center
    font-size 25px
    line-height 100px
    color deeppink
    user-select none
</style>
