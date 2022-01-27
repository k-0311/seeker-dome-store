<template>
  <div class="positon cap">
    <div class="color">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup () {
    const value = ref(300)
    return {
      value
    }
  }
}
</script>

<style lang="scss" scoped>
.positon {
  margin: auto;
  margin-right: 100px;
}
.cap {
  width: 200px;
  height: 20px;
  background: #e2e6ec;
  border-radius: 4px;
  overflow: hidden;
}
.color {
  width: 100%;
  line-height: 20px;
  color: #fff;
  text-align: right;
  box-sizing: border-box;
  background: linear-gradient(90deg, #3b8bff 0%, #37b2ff 100%);
  border-radius: 4px;
  transition: transform 0.5s;
  span {
    padding-right: 8px;
  }
}
</style>