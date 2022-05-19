<template>
  <div>
    <!-- <div @click="renderLayout('TB')">切换布局A</div> -->
    <!-- <div @click="renderLayout('LR')">切换布局B</div> -->
    <div id="x6-box"></div>
  </div>
</template>

<script>
import '@antv/x6-vue-shape'
import nodeBase from './components/node-base';
import { Graph, Node, Edge, Shape } from '@antv/x6'
import dagre from 'dagre'
import { getDataList } from './faker';
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
    initGraph () {
      this.getDataList()
      this.createGraph()
    },
    createGraph () {

      class TreeNode extends Node {
        collapsed = false
        postprocess () {
          this.toggleCollapse(false)
        }
        isCollapsed () {
          return this.collapsed
        }
        toggleCollapse (collapsed) {
          const target = collapsed == null ? !this.collapsed : collapsed
          if (!target) {
            this.attr('buttonSign', {
              d: 'M 1 5 9 5 M 5 1 5 9',
              strokeWidth: 1.6,
            })
          } else {
            this.attr('buttonSign', {
              d: 'M 2 5 8 5',
              strokeWidth: 1.8,
            })
          }
          this.collapsed = target
        }
        toggleButtonVisibility (visible) {
          this.attr('buttonGroup', {
            display: visible ? 'block' : 'none',
          })
        }
      }
      TreeNode.config({
        zIndex: 2,
        markup: [
          {
            tagName: 'g',
            selector: 'buttonGroup',
            children: [
              {
                tagName: 'rect',
                selector: 'button',
                attrs: {
                  'pointer-events': 'visiblePainted',
                },
              },
              {
                tagName: 'path',
                selector: 'buttonSign',
                attrs: {
                  fill: 'none',
                  'pointer-events': 'none',
                },
              },
            ],
          },
          {
            tagName: 'rect',
            selector: 'body',
          },
          {
            tagName: 'text',
            selector: 'label',
          },
        ],
        attrs: {
          body: {
            refWidth: '100%',
            refHeight: '100%',
            strokeWidth: 1,
            fill: '#EFF4FF',
            stroke: '#5F95FF',
          },
          label: {
            textWrap: {
              ellipsis: true,
              width: -10,
            },
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
            refX: '50%',
            refY: '50%',
            fontSize: 12,
          },
          buttonGroup: {
            refX: '100%',
            refY: '50%',
          },
          button: {//折叠按钮
            fill: '#42b983',
            stroke: 'none',
            x: -10,
            y: -10,
            height: 20,
            width: 30,
            rx: 10,
            ry: 10,
            cursor: 'pointer',
            event: 'node:collapse',
          },
          buttonSign: {//加号
            refX: 5,
            refY: -5,
            stroke: '#ffffff',
            strokeWidth: 1.6,
          },
        },
        inherit: 'vue-shape',
        width: 240,
        height: 70,
        component: {
          template: `<node-base />`,
          components: {
            nodeBase
          }
        }
      })

      class TreeEdge extends Shape.Edge {
        isHidden () {
          const node = this.getTargetNode()
          return !node || !node.isVisible()
        }
      }
      TreeEdge.config({
        zIndex: 1,
        attrs: {
          line: {
            stroke: '#A2B1C3',
            strokeWidth: 1,
            targetMarker: null,
          },
        },
      })

      Graph.registerNode('tree-node', TreeNode, true)
      Graph.registerEdge('tree-edge', TreeEdge, true)

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

      this.graph.on('node:collapse', ({ node }) => {
        node.toggleCollapse()
        const collapsed = node.isCollapsed()
        const run = (pre) => {
          const succ = this.graph.getSuccessors(pre, { distance: 1 })
          if (succ) {
            succ.forEach((node) => {
              node.toggleVisible(!collapsed)
              if (!node.isCollapsed()) {
                run(node)
              }
            })
          }
        }
        run(node)
      })

      fetch('https:/x6.antv.vision/zh/examples/data/mindmap.json')
        .then((response) => response.json())
        .then((data) => {
          const start = new Date().getTime()
          console.log("createGraph -> data.nodes", data.nodes)
          const nodes = data.nodes.map(({ leaf, ...metadata }) => {
            const { x, y, id, width, height } = metadata
            const node = new TreeNode({
              id,
              shape: 'node-base',
              data: metadata
            })
            if (leaf) {
              node.toggleButtonVisibility(leaf === false)
            }
            return node
          })
          const edges = data.edges.map(
            (edge) => {
              return new TreeEdge({
                source: edge.source,
                target: edge.target,
              })
            },
          )
          this.graph.resetCells([...nodes, ...edges])

          this.graph.unfreeze({
            progress ({ done }) {
              if (done) {
                const time = new Date().getTime() - start
                console.log(time)
                this.graph.unfreeze({
                  batchSize: 50,
                })
                this.graph.zoomToFit({ padding: 24 })
              }
            },
          })
          this.renderLayout('LR')
        })
    },
    createNodes () {

    },
    createEdges () {

    },
    //=====================
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
    renderLayout (dir) {
      this.dir = dir
      this.layout()
      this.graph.centerContent()
    }
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