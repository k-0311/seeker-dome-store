<template>
  <div class="model" :style="style">
    <div class="model-title">{{data.title}}
      <div class="model-close">x</div>
    </div>
    <div class="model-content">
      <slot :name="data.slot" :data="data"></slot>
    </div>
    <div class="model-footer">
      <slot name="footer">
        <div @click="$emit('step',-1)" v-if="!data.first">上一步</div>
        <div @click="$emit('step',1)" v-if="!data.last">下一步</div>
        <div v-else>关闭</div>
        <slot name="footer-right"></slot>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    data: Object,
  },
  computed: {
    style ({ data }) {
      return { left: `${data.x || 0}px`, top: `${data.y || 0}px` }
    }
  }
}
</script>

<style lang="scss" scoped>
.model {
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 57px;
  padding: 0 16px;
  width: 400px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 8px 24px rgb(0 0 0 / 24%);
  &::before {
    content: ' ';
    position: absolute;
    left: -54px;
    top: 18px;
    width: 6px;
    height: 6px;
    border: 5px solid #4280f8;
    border-radius: 50%;
  }
  &::after {
    content: ' ';
    position: absolute;
    top: 26px;
    left: -38px;
    width: 38px;
    height: 1px;
    background: #4280f8;
  }
  &-title {
    position: relative;
    display: flex;
    align-items: center;
    height: 55px;
    background-color: orange;

    font-size: 16px;
    color: #031333;
  }
  &-close {
    position: absolute;
    top: 16px;
    right: 0;
  }
  &-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 70px;
    background-color: pink;
  }
}
</style>