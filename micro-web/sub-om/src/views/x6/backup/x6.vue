<template>
  <div id="container"></div>
</template>
<script>
import { Graph } from '@antv/x6';
import * as node from './util';

export default {
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    createGraph () {
      const graph = new Graph({
        container: document.getElementById('container'),
        width: 500,
        height: 500,
        scroller: {
          enabled: false,
        },
        background: {
          color: '#fffbe6', // 设置画布背景颜色
        },
        grid: {
          size: 10,      // 网格大小 10px
          visible: true, // 渲染网格背景
        },
        interacting: function (cellView) {
          if (cellView.cell.getData() != undefined && !cellView.cell.getData().disableMove) {
            return { nodeMovable: false }
          }
          return true
        }
      });
      return graph
    },
    init () {
      const graph = this.createGraph()
      this.createNode(graph)
      this.createEvent(graph)
    },
    createNode (graph) {
      const nodes = Array.from({ length: 5 })
      nodes.forEach((_, i) => {
        const item = node.node
        item.y = i * item.height + (i + 1) * 20
        graph.addNode(item);
      })
    },
    createEvent (graph) {
      const events = {
        'node:fold': (data) => {
          console.log("createEvent -> node:fold", data)
        },
        'node:copy': (data) => {
          console.log("createEvent -> node:copy", data)
        },
        'node:abstract': (data) => {
          console.log("createEvent -> node:abstract", data)
        },
        'node:jump': (data) => {
          console.log("createEvent -> node:jump", data)
        }
      }
      Object.entries(events).map(([name, fn]) => {
        graph.on(name, fn)
      })
    }
  }
};
</script>

<style scoped>
#container {
  margin: 0 auto;
}
</style>