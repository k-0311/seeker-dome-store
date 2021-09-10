<template>
  <div class="capsule-bar">
    <div class="black-border">
      <div class="progress" :style="{'transform': `translate(${-(100 - progress)}%)`,'background-color':color,'transition':`all ${speed / 1000}s`}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    progress: {
      type: [Number, String],
      default: 0
    },
    color: {
      type: String,
      default: 'rgba(11, 154, 251, 1)'
    },
    speed: {
      type: [Number, String],
      default: 500
    }
  }
}
</script>

<style lang="scss" scoped>
.capsule-bar {
  width: 200px;
  height: 18px;
  border-radius: 10px;
  border: 1px solid rgba(11, 154, 251, 0.5);
  box-sizing: border-box;
  .black-border {
    width: 198px;
    height: 16px;
    border-radius: 10px;
    border: 3px solid #0b1232;
    background-color: #0b1232;
    box-sizing: border-box;
    overflow: hidden;
  }
  .progress {
    width: 192px;
    height: 10px;
    border-radius: 10px;
    transform: translate(-100%);
  }
}
</style>