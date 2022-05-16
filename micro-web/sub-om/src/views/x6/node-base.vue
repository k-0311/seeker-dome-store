<template>
  <div class="node">
    <div class="title">
      <span>{{label}}</span>
      <img class="icon" src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png" @click="jump">
    </div>
    <div class="content">
      <span>2022-12-12</span>
      <img class="icon" src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png" @click="copy">
      <img class="icon" src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png" @click="abstract">
    </div>
    <img class="icon fold" src="https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png" @click="foldCard">
  </div>
</template>

<script>

export default {
  name: 'nodeBase',
  inject: ['getGraph', 'getNode'],
  data () {
    return {
      label: '',
    }
  },
  mounted () {
    const self = this
    const node = this.getNode()
    this.label = node.data.label
    // 监听数据改变事件
    node.on('change:data', ({ current }) => {
      self.label = current.label
      self.status = current.status
    })
  },
  methods: {
    foldCard () {
      console.log("foldCard -> foldCard")
    },
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
