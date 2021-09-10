const v1 = {
  a: {},
  b: {},
  c: {},
  d: {}
}

const version = '10.0'
const versionMap = {
  3.1: {
    a: { aa: 5 }
  },
  8.6: {
    b: {
      tt: 9
    }
  },
  4.5: {
    f: { dd: 6 }
  }
}

const featMap = Object.keys(versionMap).reduceRight((acc, v) => {
  if (+version < +v) return acc
  versionMap[v]
  return { ...versionMap[v], ...acc }
}, {})

const typeJuge = v => Object.prototype.toString.call(v).slice(8, -1)
const deepMerge = (feat, old) => {
  for (const key of Object.keys(feat)) {
    if (!old[key]) {
      old[key] = feat[key]
      continue
    }
    if (
      typeJuge(old[key]) === 'Object' &&
      typeJuge(feat[key]) === 'Object'
    ) {
      deepMerge(feat[key], old[key])
    }
  }
  return old
}

console.log(deepMerge(featMap, v1))