<template>
  <div id="draw-cot"></div>
</template>

<script>
import '@antv/x6-vue-shape'
import { Graph, Node, Path, Cell } from '@antv/x6'
import nodeBase from './node-base';
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
        height: 36,
        component: {
          template: `<node-base />`,
          components: {
            nodeBase
          }
        },
        ports: {
          groups: {
            top: {
              position: 'top',
              attrs:
              {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke:
                    '#C2C8D5',
                  strokeWidth: 1,
                  fill: '#fff'
                }
              }
            },
            bottom: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 4,
                  magnet:
                    true,
                  stroke: '#C2C8D5',
                  strokeWidth: 1,
                  fill: '#fff'
                }
              }
            }
          }
        }
      },
        true
      )
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
        container: document.getElementById('draw-cot'),
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
        highlighting: {
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#fff',
                stroke: '#31d0c6',
                strokeWidth: 4
              }
            }
          }
        },
        connecting: {
          snap: true,
          allowBlank: false,
          allowLoop: false,
          highlight: true,
          connector: 'algo-connector',
          connectionPoint: 'anchor',
          anchor: 'center',
          validateMagnet ({ magnet }) {
            // return magnet.getAttribute('port-group') !== 'top'

            // 限制连线配置
            return true
          },
          createEdge () {
            return graph.createEdge({
              shape: 'dag-edge',
              attrs: {
                line: {
                  strokeDasharray: '5 5',
                  targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8
                  }
                }
              },
              zIndex: -1
            })
          }
        },
        selecting: {
          enabled: true,
          multiple: true,
          rubberEdge: true,
          rubberNode: true,
          modifiers: 'shift',
          rubberband: true
        },
        keyboard: true,
        clipboard: true,
        history: true
      })
      this.graph = graph
      this.addNode()
    },
    addNode () {
      const time = new Date().getTime()
      const option = {
        x: 500,
        y: 200,
        width: 180,
        height: 60,
        shape: 'node-base',
        data: {
          type: 'database',
          label: '数据库',
          name: 'mySql',
          "data": {
            "name": 'mysql'
          }
        },
        ports: {
          groups: {
            top: {
              position: 'top',
              attrs:
              {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke:
                    '#C2C8D5',
                  strokeWidth: 1,
                  fill: '#fff'
                }
              }
            },
            bottom: {
              position: 'bottom',
              attrs: {
                circle: {
                  r: 4,
                  magnet:
                    true,
                  stroke: '#C2C8D5',
                  strokeWidth: 1,
                  fill: '#fff'
                }
              }
            }
          },
          items: [
            {
              id: `in-${time}`,
              group: 'top' // 指定分组名称
            },
            {
              id: `out-${time}`,
              group: 'bottom' // 指定分组名称
            }
          ]
        }
      }
      const p = this.graph.pageToLocal(option.x, option.y)
      this.graph.addNode(Object.assign({}, option, p))
    }
  }
}
</script>

<style scoped>
#draw-cot {
  margin: 0 auto;
  width: 600px;
  height: 600px;
}
</style>