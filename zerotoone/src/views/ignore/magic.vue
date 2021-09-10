<template>
  <div>
    <div @click="mode = 0">mode 1</div>
    <div @click="mode = 1">mode 2</div>

    <div class="magic-box" :style="{width:375 + 'px', height:containerSize.height +'px', gridTemplateColumns:containerSize.columns, gridTemplateRows:containerSize.rows}">
      <div class="item" v-for="item in containerSize.list" :key="item">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mode: 1,
      magic: [{
        columns: 'repeat(2,1fr)',
        rows: 'repeat(1, 1fr)',
        list: [[1, 1], [1, 1]]
      }, {
        columns: 'repeat(2, 1fr)',
        rows: 'repeat(2, 1fr)',
        list: [[1, 2], [1, 1], [1, 1]]// [column, row]
      }],
      pageMarigin: 10,
      //==================================
      firstImgH: 400,
      shadow: 0
    }
  },
  computed: {
    containerSize () {
      const mode = this.magic[this.mode] || this.magic[0]
      const whRatio = 375 / this.firstImgH
      mode.width = mode.width - this.pageMarigin
      mode.height = this.firstImgH - this.pageMarigin / whRatio
      return mode
    }
  }
}
</script>

<style lang="scss" scoped>
.magic-box {
  display: grid;
  // grid-gap: 15px;
  margin: 0 auto;
  background-color: pink;
  .item {
    background-color: orange;
  }
}
</style>