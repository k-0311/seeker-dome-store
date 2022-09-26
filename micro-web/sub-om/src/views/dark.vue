<template>
  <div class="paginate">
    <div class="paginate-total">21条记录</div>
    <div></div>
  </div>
</template>

<script>

export default {
  setup () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.paginate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 28px;
  background-color: #ddd;
  &-total {
    width: 51px;
    height: 20px;
    font-size: 12px;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-weight: 400;
    color: #0c6fff;
    line-height: 20px;
  }
}
</style>