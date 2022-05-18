<template>
  <div id="x6-box"></div>
</template>

<script>
import '@antv/x6-vue-shape'
import { Graph } from '@antv/x6'
import nodeBase from './node-base';
import { getDataList } from './backup/faker';
import { createNodeBase, createNodeEdge } from './config';

const OVERWRITE = true
export default {
  data () {
    return {
      graph: '',
    }
  },
  mounted () {
    // 初始化 graph
    this.initGraph()
  },
  methods: {
    initGraph () {
      Graph.registerNode('node-base', {
        inherit: 'vue-shape',
        width: 180,
        height: 60,
        component: {
          template: `<node-base />`,
          components: {
            nodeBase
          }
        }
      }, OVERWRITE)
      Graph.registerEdge('node-edge', {
        inherit: 'edge',
        attrs: {
          line: {
            stroke: '#C2C8D5',
            strokeWidth: 2,
            targetMarker: {
              name: 'block',
              width: 12,
              height: 8
            }
          }
        }
      }, OVERWRITE)
      const graph = new Graph({
        grid: {
          size: 10,
          visible: true,
          type: 'dot', // 'dot' | 'fixedDot' | 'mesh'
          args: {
            color: '#a05410', // 网格线/点颜色
            thickness: 1 // 网格线宽度/网格点大小
          }
        },
        background: {
          color: '#fffbe6' // 设置画布背景颜色
        },
        container: document.getElementById('x6-box'),
        panning: {
          enabled: true,
          eventTypes: ['leftMouseDown', 'mouseWheel']
        },
        mousewheel: {
          enabled: true,
          modifiers: 'ctrl',
          factor: 1.1,
          maxScale: 1.5,
          minScale: 0.5
        },
      })
      this.graph = graph
      this.init()
    },
    init () {
      const dataList = getDataList()
      const cells = []
      let left = 0
      let right = 0
      let index = 0
      dataList.forEach((item, i) => {
        if (item.dir === "right") {
          index = right
          right++
        } else {
          index = left
          left--
        }
        const node = createNodeBase(item, index)
        cells.push(this.graph.createNode(node))
        if (item.key && item.parent) {
          const edge = createNodeEdge(item)
          cells.push(this.graph.createEdge(edge))
        }
      })
      this.graph.resetCells(cells)
    },
    addNode (option) {
      const p = this.graph.pageToLocal(option.x, option.y)
      this.graph.addNode(Object.assign({}, option, p))
    },
  }
}
</script>

<style scoped>
#x6-box {
  margin: 0 auto;
  width: 700px;
  height: 700px;
}
</style>