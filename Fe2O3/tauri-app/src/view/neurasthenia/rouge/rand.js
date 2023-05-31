import { randRange } from '../utils'
import { NODETYPE, DIFFICULTY_RANGE } from '@/view/neurasthenia/constant'

const NodeTypeMap = () => Object.fromEntries(Object.entries(NODETYPE).map(([key, value]) => [value, key]))

const randNodeType = (level) => {
  const { Safe, Store, Treasure, Normal, Elite, Boss } = NODETYPE
  const nodes = [
    {
      level: 5,
      nodes: [Safe, Store, Normal]
    },
    {
      level: 10,
      nodes: [Safe, Store, Treasure, Normal, Elite]
    },
    {
      level: 9999,
      nodes: [Store, Treasure, Normal, Elite, Boss]
    }
  ].find(item => item.level >= level).nodes
  return nodes[randRange(0, nodes.length - 1)]
}

const randNodeNumber = () => {
  return [
    {
      limit: 45,
      value: 2
    },
    {
      limit: 80,
      value: 3
    },
    {
      limit: 95,
      value: 4
    },
    {
      limit: 100,
      value: 5
    }
  ].find(item => item.limit >= Math.ceil(Math.random() * 100)).value
}

export const getRandNode = number => {
  const level = Math.ceil(number / DIFFICULTY_RANGE)// 一定关卡后难度提升
  const nodes = new Set(Array.from({ length: randNodeNumber() }, (_, i) => randNodeType(level)))
  if (nodes.size === 1) {
    nodes.add(nodes.has(NODETYPE.Normal) ? NODETYPE.Safe : NODETYPE.Normal)
  }
  const keyMap = NodeTypeMap()
  return [...nodes].map(value => ({ type: value, typeStr: keyMap[value] }))
}
