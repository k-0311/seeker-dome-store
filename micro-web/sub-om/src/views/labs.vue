<template>
  <div>
    <div @click="add1">ref:{{ state1 }} </div>
    <div @click="add2">toref:{{ state2 }}</div>
    <subLabs v-model:nutone="nutone" v-model:eggman="eggman" @click="add1" class="my-class" style="color:#f40"></subLabs>
    <div>{{nutone}}</div>
  </div>
</template>

<script>
import { ref, toRef } from 'vue'
import { toRefs, shallowRef, triggerRef } from 'vue'
import { reactive, shallowReactive } from 'vue'
import { toRaw, markRaw } from 'vue'
import { provide } from 'vue'
import { watch, watchEffect } from 'vue'
import { getCurrentInstance } from 'vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import subLabs from '@/components/subLabs'
export default {
  components: {
    subLabs
  },
  setup (props, context) {
    provide('outfit', 'CDPF')
    onMounted(() => { })


    const ubi = { count: 3 }
    const scvr = { trigger: 1 }

    const state1 = ref(ubi.count) //* ref 是对传入数据的拷贝，值改变会更新视图。推荐【基本类型】使用
    const state2 = toRef(ubi, 'count') //* toRef 是对传入数据的引用，值改变不会更新视图
    const add1 = () => {
      state1.value++
    }
    const add2 = () => {
      state2.value++
    }

    const mkr = markRaw(scvr) //*将原始数据标记为非响应式的，即使用 ref 或 reactive 将其包装，仍无法实现数据响应式
    const xs01 = reactive(ubi) //* 与 ref 功能相同，推荐【引用类型】使用
    const xs02 = shallowReactive(ubi) //* reactive 的优化版，只有第一层被 Proxy 处理

    console.log(toRaw(xs01) === ubi) //*接收的参数是 ref 对象时，需要加上 .value 才能获取到原始数据对象

    watch(
      [state1, () => ubi.count, () => scvr.trigger],
      ([ns1, uc1, st1], [os0, uc0, st0]) => {
        console.log('add2 -> ns1', ns1)
        console.log('add2 -> os0', os0)

        // console.log("add2 -> uc1", uc1)
        // console.log("add2 -> uc0", uc0)

        // console.log("add2 -> st1", st1)
        // console.log("add2 -> st0", st0)
      },
      {
        immediate: true,
        deep: true,
      }
    )() //* watch方法会返回一个stop方法，若想要停止监听，便可直接执行该stop函数

    /**
     * !与 watch() 的区别主要有以下几点
     * *1.不需要手动传入依赖
     * *2.每次初始化时会执行一次回调函数来自动获取依赖
     * *3.无法获取到原值，只能得到变化后的值
     */
    watchEffect(() => {
      console.log('add2 -> state1', state1.value)
    })

    const instance = getCurrentInstance()
    const store = useStore()

    const nutone = ref(0)
    const eggman = ref(0)
    return {
      state1,
      state2,
      add1,
      add2,
      nutone,
      eggman
    }
  }
}
</script>

<style lang="scss" scoped>
</style>