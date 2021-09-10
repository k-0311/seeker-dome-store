import { createApp, reactive } from 'vue'
import loading from './loading.vue'

const msg = reactive({
  show: false,
  title: '拼命加载中...'
})
const $myload = createApp(loading, { msg }).mount(document.createElement('div'))
const load = {
  show ({ title = '拼命加载中...', duration = 2000 }) { // 控制显示loading的方法
    msg.show = true
    msg.title = title
    document.body.appendChild($myload.$el)
    setTimeout(() => {
      this.hide()
    }, duration);
  },
  hide () { // 控制loading隐藏的方法
    msg.show = false
    document.body.removeChild($myload.$el)
  }
}

export default {
  install (app) {
    app.config.globalProperties.$loading = function (...args) {
      load.show(...args)
    }
  }
}