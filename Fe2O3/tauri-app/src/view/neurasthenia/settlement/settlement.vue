<script setup>
import CountTo from '@/view/neurasthenia/count-to'
defineProps({
  show: Boolean
})
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <CountTo :start='0' :end='2000' prefix="$" suffix="rmb" :autoPlay="true" :duration='3000' />
          <button class="modal-default-button" @click="$emit('close')">OK</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="stylus" scoped>
.modal
  &-mask
    position fixed
    z-index 9998
    top 0
    left 0
    right 0
    bottom 0
    display grid
    align-items center
    justify-content center
    transition opacity 0.3s ease
  &-container
    width 300px
    margin 0px auto
    padding 20px 30px
    background-color #fff
    border-radius 2px
    box-shadow 0 2px 8px rgba(0, 0, 0, 0.33)
    transition all 0.3s ease
.modal-enter-from, .modal-leave-to
  opacity 0
.modal-enter-from .modal-container, .modal-leave-to .modal-container
  filter blur(5px)
  transform scale(1.1)
</style>
