<script setup>
import { ref, computed, watchEffect } from 'vue'
import { BASIC_SCORE, MULTIPLIER, ADDITION } from '@/view/neurasthenia/constant'
import { shuffle as _shuffle, createList, createItem } from '@/view/neurasthenia/utils'
import { additionalChallenges } from '@/view/neurasthenia/additional-challenges'

import Rouge from '@/view/neurasthenia/rouge'
import Settlement from '@/view/neurasthenia/settlement'
import PlayInfo from '@/view/neurasthenia/play-info'

const multiplier = ref(MULTIPLIER)
const multiText = computed(() => parseInt(multiplier.value * 100))
const surplus = ref(30)
const score = ref(0)
const successNumber = ref(1)
const nextPassData = ref(null)
watchEffect(() => {
  const extra = additionalChallenges(nextPassData.value)
  console.log('extra', extra)
})

const LENGTH = 1
const list = ref(createList(LENGTH))
let id = list.value.length + 1

function insert () {
  const item = createItem(id++)
  list.value.push(...[item, { ...item }])
  shuffle()
}

function reset () {
  list.value = createList(LENGTH)
}

function fill () {
  const length = list.value.length
  const fills = list.value.filter(item => !item.hidden)

  if (length === fills.length) return

  let num = (length - fills.length) / 2
  while (num--) {
    const item = createItem(id++)
    fills.push(...[item, { ...item }])
  }
  list.value = fills
  shuffle()
}

function shuffle () {
  list.value = _shuffle(list.value)
}

function peek (item) {
  if (item.hidden) return
  item.flip = true
  checkCard(item)
}

const checkeds = []
function checkCard (item) {
  if (!checkeds.length) {
    checkeds.push(item)
    return
  }

  surplus.value--
  const prev = checkeds.shift()
  if (prev.type === item.type) {
    updateScore()
    multiplier.value += ADDITION
    setTimeout(() => {
      prev.hidden = item.hidden = true
      checkPass()
    }, 1000)
  } else {
    multiplier.value = MULTIPLIER
    setTimeout(() => {
      prev.flip = item.flip = false
    }, 1000)
  }
}
function updateScore () {
  score.value = parseInt(BASIC_SCORE * multiplier.value)
}

const selectPass = ref(false)
const passOver = ref(false)
function checkPass () {
  if (list.value.every(item => item.hidden)) {
    // passOver.value = true
    selectPass.value = true
    successNumber.value += 1
  }
}
function closeSettlement () {
  passOver.value = false
  // selectPass.value = true
}

function nextPass (item) {
  nextPassData.value = { successNumber: successNumber.value, ...item }
  list.value = createList(LENGTH)
  setTimeout(() => {
    selectPass.value = false
  }, 300)
}
</script>

<template>
  <div class="game-world" :class="{filter:passOver}">
    <div class="top-data" v-if="false">
      <div>剩余次数: {{surplus}}</div>
      <div>分数加成: {{multiText}}%</div>
      <div>当前分数: {{score}}</div>
      <div>关卡数: {{successNumber}}</div>
    </div>
    <div>
      <button @click="insert">insert at random index</button>
      <button @click="fill">fill all empty</button>
      <button @click="reset">reset</button>
      <button @click="shuffle">shuffle</button>
    </div>
    <TransitionGroup tag="div" name="outer" class="card-group">
      <div v-for="item in list" class="item-outer" :key="item">
        <Transition name="inner">
          <div class="item-inner" @click.stop="peek(item)" v-show="!item.hidden">
            <div :style="{backgroundColor:item.color, backgroundImage:`url(${item.image})`}" :class="['item-inner-card',{flip:item.flip}]"></div>
          </div>
        </Transition>
      </div>
    </TransitionGroup>
  </div>
  <play-info></play-info>
  <Teleport to="body">
    <settlement :show="passOver" @close="closeSettlement"></settlement>
  </Teleport>
  <Teleport to="body">
    <rouge :show="selectPass" :success-number="successNumber" @next-pass="nextPass"></rouge>
  </Teleport>
</template>

<style lang="stylus" scoped>
.game-world
  transition filter 0.5s
  &.filter
    filter blur(5px)
.top-data
  display grid
  grid-template-columns repeat(3, 1fr)
  justify-items center
  align-items center
.card-group
  position relative
  padding 0
  display grid
  gap 10px
  grid-template-columns repeat(4, 1fr)
  width 630px
.item
  &-outer
    position relative
    aspect-ratio 1 / 1.3
    box-sizing border-box
    background-color transparent
  &-inner
    width 100%
    height 100%
    transition transform 0.5s
    &-card
      width 100%
      height 100%
      &.flip
        animation flip-animate 0.5s both
.outer-move, .outer-enter-active, .outer-leave-active, .inner-move, .inner-enter-active, .inner-leave-active
  transition all 0.5s cubic-bezier(0.55, 0, 0.1, 1)
.outer-enter-from, .outer-leave-to, .inner-enter-from, .inner-leave-to
  opacity 1
  transform scale(0.01)
.outer-leave-active
  position absolute
.flip.inner-enter-from, .flip.inner-leave-to
  transform scale(0.01) rotateY(180deg)
@keyframes flip-animate
  100%
    background-image none
    transform rotateY(180deg)
</style>
