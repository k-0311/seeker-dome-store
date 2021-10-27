
import { h, reactive } from 'vue';
export default {
  name: 'r1',
  functional: true,
  props: {

  },
  setup (props, ctx) {
    const obj = reactive({
      count: 0
    })
    const increment = () => {
      obj.count++
    }

    const { tag, data, params } = {
      tag: 'div',
      data: {
        onClick: increment
      },
      params: { obj }
    }

    return () => h(tag, data, params)
  }
}