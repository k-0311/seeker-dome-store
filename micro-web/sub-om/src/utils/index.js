const EMP_VALUE = (fn) => {
  const _VALUES = {
    String: '',
    Number: 0,
    Array: [],
    Object: {},
    Boolean: false
  }
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? _VALUES[match[1]] : null
}
const Local = {
  set (name, value) {
    const v = value ? JSON.stringify(value) : ''
    localStorage.setItem(name, v)
  },
  get (name, type = Object) {
    const v = localStorage.getItem(name)
    return v ? JSON.parse(v) : EMP_VALUE(type)
  },
  del (name) {
    localStorage.removeItem(name)
  }
}
const Session = {
  set (name, value) {
    const v = value ? JSON.stringify(value) : ''
    sessionStorage.setItem(name, v)
  },
  get (name, type = Object) {
    const v = sessionStorage.getItem(name)
    return v ? JSON.parse(v) : EMP_VALUE(type)
  },
  del (name) {
    sessionStorage.removeItem(name)
  }
}
const Cookie = {
  set (name, value, days) {
    var d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    window.document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`
  },
  get (name) {
    var v = window.document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
    return v ? v[2] : null
  },
  del (name) {
    this.set(name, '', -1)
  }
}

function base64ToBlob (base64) {
  let parts = base64.split(';base64,')
  let contentType = parts[0].split(':')[1]
  let raw = window.atob(parts[1])
  let uInt8Array = new Uint8Array(raw.length)
  for (let i = 0; i < raw.length; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  const blob = new Blob([uInt8Array], { type: contentType })
  return URL.createObjectURL(blob)
}


const queryToUrl = (obj = {}) =>
  Object.keys(obj)
    .reduce((str, key) => (str += `&${key}=${obj[key]}`), '')
    .replace('&', '?')

export { Local, Session, Cookie, base64ToBlob, queryToUrl }
export default { Local, Session, Cookie, base64ToBlob, queryToUrl }