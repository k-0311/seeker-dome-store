let findEle = (parent, type) => parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)

const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}


export default {
  bind: function (el) {
    var regRule = /[^\u4E00-\u9FA5|\d|a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g
    let $inp = findEle(el, 'input')
    el.$inp = $inp
    $inp.handle = function () {
      $inp.value = $inp.value.replace(regRule, '')
      trigger($inp, 'input')
    }
    $inp.addEventListener('keyup', $inp.handle)
  },
  unbind (el) {
    el.$lip.removeEventListener('keyup', el.$lip.handle)
  }
}