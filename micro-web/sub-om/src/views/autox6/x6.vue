<template>
  <div>
    <div @click="renderLayout('TB')">切换布局A</div>
    <div @click="renderLayout('LR')">切换布局B</div>
    <div id="x6-box"></div>
  </div>
</template>

<script>
import '@antv/x6-vue-shape'
import { Graph } from '@antv/x6'
import dagre from 'dagre'
import { registerComponents } from './components';
import { getDataList } from './faker';
import { left } from '@antv/x6/lib/registry/port-layout/line';
export default {
  data () {
    return {
      graph: '',
      dir: 'TB',// 布局方向 LR RL TB BT
      dataList: []
    }
  },
  mounted () {
    // 初始化 graph
    this.initGraph()
  },
  methods: {
    getDataList () {
      this.dataList = getDataList()
    },
    renderLayout (dir) {
      this.dir = dir
      this.layout()
      this.graph.centerContent()
    },
    initGraph () {
      this.getDataList()
      this.createGraph()
      const nodes = this.createNodes()
      const edges = this.createEdges(nodes)
      this.graph.resetCells([...nodes, ...edges])
      this.renderLayout('TB')
      this.setCollapseBtn()
    },
    setCollapseBtn () {
      [...this.graph.getRootNodes(), ...this.graph.getLeafNodes()].forEach(node => {
        node.setData({
          hideCollapse: true
        })
      })
    },
    createGraph () {
      registerComponents(Graph)
      this.graph = new Graph({
        grid: {
          size: 10,
          visible: true,
          type: 'dot', // 'dot' | 'fixedDot' | 'mesh'
          args: {
            color: '#a05410', // 网格线/点颜色
            thickness: 1 // 网格线宽度/网格点大小
          }
        },
        interacting: false,
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
    },
    createNodes () {
      return this.dataList.map(data => this.graph.createNode({
        shape: 'node-base',
        data,
      }))
    },
    createEdges (nodes) {
      const edges = []
      nodes.forEach(target => {
        if (target.data.parent) {
          let source = nodes.find(({ data }) => data.key === target.data.parent)
          if (target.data.dir === 'left') {
            [target, source] = [source, target]
          }
          edges.push(this.graph.createEdge({
            shape: 'node-edge',
            source: { cell: source.id },
            target: { cell: target.id },
          }))
        }
      })
      return edges
    },
    layout () {
      const nodes = this.graph.getNodes()
      const edges = this.graph.getEdges()
      const g = new dagre.graphlib.Graph()
      g.setGraph({ rankdir: this.dir, nodesep: 16, ranksep: 16 })
      g.setDefaultEdgeLabel(() => ({}))

      const width = 260
      const height = 90
      nodes.forEach((node) => {
        g.setNode(node.id, { width, height })
      })

      edges.forEach((edge) => {
        const source = edge.getSource()
        const target = edge.getTarget()
        g.setEdge(source.cell, target.cell)
      })

      dagre.layout(g)

      this.graph.freeze()

      g.nodes().forEach((id) => {
        const node = this.graph.getCell(id)
        if (node) {
          const pos = g.node(id)
          node.position(pos.x, pos.y)
        }
      })

      edges.forEach((edge) => {
        const source = edge.getSourceNode()
        const target = edge.getTargetNode()
        const sourceBBox = source.getBBox()
        const targetBBox = target.getBBox()
        if ((this.dir === 'LR' || this.dir === 'RL') && sourceBBox.y !== targetBBox.y) {
          const gap =
            this.dir === 'LR'
              ? targetBBox.x - sourceBBox.x - sourceBBox.width
              : -sourceBBox.x + targetBBox.x + targetBBox.width
          const fix = this.dir === 'LR' ? sourceBBox.width : 0
          const x = sourceBBox.x + fix + gap / 2
          edge.setVertices([
            { x, y: sourceBBox.center.y },
            { x, y: targetBBox.center.y },
          ])
        } else if (
          (this.dir === 'TB' || this.dir === 'BT') &&
          sourceBBox.x !== targetBBox.x
        ) {
          const gap =
            this.dir === 'TB'
              ? targetBBox.y - sourceBBox.y - sourceBBox.height
              : -sourceBBox.y + targetBBox.y + targetBBox.height
          const fix = this.dir === 'TB' ? sourceBBox.height : 0
          const y = sourceBBox.y + fix + gap / 2
          edge.setVertices([
            { x: sourceBBox.center.x, y },
            { x: targetBBox.center.x, y },
          ])
        } else {
          edge.setVertices([])
        }
      })

      this.graph.unfreeze()
    },
  }
}
</script>

<style scoped>
#x6-box {
  margin: 0 auto;
  width: 900px;
  height: 700px;
}
</style>