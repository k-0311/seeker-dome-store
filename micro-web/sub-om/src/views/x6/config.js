export const createNodeBase = (data, index) => {
  return {
    shape: 'node-base',
    id: data.key,
    x: 20,
    y: 60 * index + 40 * index,
    data
  }
}

export const createNodeEdge = (data, index) => {
  const [source, target] = data.dir === "right" ? [data.parent, data.key] : [data.key, data.parent]
  return {
    id: `edge_${data.key}`,
    shape: 'node-edge',
    zIndex: 0,
    source,
    target
  }
}