<template>
  <div>
    <template v-for="(data,index) in list" :key="data.title">
      <guide-model :data="data" @step="step" v-if="stepIndex === index">
        <template #gif>
          <div>2222</div>
        </template>
      </guide-model>
    </template>
  </div>
</template>

<script>
import GuideModel from './guide-model.vue';
export default {
  components: {
    GuideModel
  },
  props: {
    position: {
      type: Array,
      default: () => [
        {
          title: '点击固钉图标将菜单固定到左侧菜单栏',
          x: 200,
          y: 150
        },
        {
          title: '点击固钉图标将菜单固定到左侧菜单栏2',
          x: 100,
          y: 400
        }
      ]
    },
  },
  computed: {
    list ({ position }) {
      return position.map((data, index) => ({
        first: index === 0,
        last: index === position.length - 1,
        ...data
      }))
    }
  },
  data () {
    return {
      stepIndex: 0
    }
  },
  methods: {
    step (value) {
      this.stepIndex += value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>