<template>
  <div class="node" :class="{'hide':hide}">
    <div class="title">
      <span>{{data.title}}</span>
      <img class="icon" src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png" @click="jump">
    </div>
    <div class="content">
      <span>{{data.date}}</span>
      <img class="icon" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F9%2F5%2F6e9f3071-0cf7-4fec-adf9-f50de0d026d7.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655372977&t=07709032c330bb39906160d7023a330e" @click="copy">
      <img class="icon" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fpic2%2Fcover%2F00%2F52%2F43%2F5816bc69d5798_610.jpg&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655372977&t=d1991b38fb29f3e416cb28a7ea18629a" @click="abstract">
    </div>
  </div>
</template>

<script>

export default {
  name: 'nodeBase',
  inject: ['getGraph', 'getNode'],
  data () {
    return {
      data: '',
      hide: false
    }
  },
  mounted () {
    const self = this
    const node = this.getNode()
    this.data = node.data
  },
  methods: {
    jump () {
      console.log("jump -> jump")
    },
    copy () {
      console.log("copy -> copy")
    },
    abstract () {
      console.log("abstract -> abstract")
    }
  }
}
</script>
<style lang="scss" scoped>
.node {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  .title {
    font-size: 14px;
  }
  .content {
    font-size: 12px;
  }
}
.hide {
  display: none;
}

.icon {
  width: 12px;
  height: 12px;
  cursor: pointer;
}

.fold {
  position: absolute;
  right: 10px;
}
</style>
