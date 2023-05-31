<template>
  <Transition name="pupop" @after-enter="onAfterEnter">
    <div class="pupop" v-if="show">
      <div class="mask" :class="{'move':!mask}"></div>
      <svg class="some-svg" :viewBox="`0 0 ${size} ${size}`" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect class="some-rect" :x="halfSize - halfRect" y="30" rx="8" ry="8"></rect>
        <text class="some-text" :x="halfSize" :y="30 + vmRect" text-anchor="middle">FIRST</text>
        <g v-for="(item,i) in list" :key="i" @click="rectClick(item)">
          <path stroke="#ffffff" stroke-width="2" :d="`M${halfSize} ${topHeight} L${calculateXPos(i)} 200`" />
          <rect class="some-rect" :x="calculateXPos(i) - halfRect" y="200" rx="8" ry="8"></rect>
          <text class="some-text" :x="calculateXPos(i)" :y="200 + vmRect" text-anchor="middle">{{item.typeStr}}</text>
        </g>
      </svg>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { getRandNode } from './rand'

const props = defineProps({
  show: Boolean,
  successNumber: {
    type: Number,
    defalut: 4
  }
})
const emit = defineEmits(['next-pass'])

const size = 500
const halfSize = size * 0.5
const topHeight = 80
const halfRect = 25
const vmRect = 29
const list = getRandNode(props.successNumber)
const len = list.length
const distance = size / len
const calculateXPos = i => distance * i + (distance * 0.5)

const mask = ref(true)
function onAfterEnter () {
  mask.value = false
}
const rectClick = (item) => {
  emit('next-pass', item)
}
</script>

<style lang="stylus" scoped>
.pupop
  position fixed
  left 0
  top 0
  display grid
  justify-items center
  align-items center
  width 100vw
  height 100vh
  background-color rgba(36, 41, 54, 1)
  transition all 0.5s ease
  overflow hidden
  z-index 100
.some-svg
  width 500px
  height 500px
.some-rect
  width 50px
  height 50px
  stroke #ffffff
  stroke-width 2
  fill transparent
.some-text
  font-size 14px
  fill #ffffff
  cursor default
.mask
  position absolute
  left 0
  top 0
  width 100%
  height 100%
  background-color rgba(36, 41, 54, 1)
  transition transform 2.5s
  z-index 99
.move
  transform translateY(100%)
.pupop-enter-from, .pupop-leave-to
  opacity 0
  background-color rgba(36, 41, 54, 0)
.pupop-enter-from .pupop-container, .pupop-leave-to .pupop-container
  filter blur(5px)
</style>
