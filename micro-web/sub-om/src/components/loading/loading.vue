
<template>
  <div class="Loading" v-show="msg.show">
    <div>{{msg.title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    msg: Object,
    aaa: Number
  }
}
</script>

<style lang="scss" scoped>
.Loading {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 6px 15px;
  }
}
</style>
