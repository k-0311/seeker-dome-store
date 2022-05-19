import nodeBase from './node-base';
const OVERWRITE = true


export const registerComponents = Graph => {
  Graph.registerNode('node-base', {
    inherit: 'vue-shape',
    width: 240,
    height: 70,
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
}