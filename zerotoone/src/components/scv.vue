<template>
  <div class="scv-tmp">
    <!-- <div class="title">fuck tr and vs</div> -->
    <!-- <div>{{title}}</div> -->
    <!-- <div>{{result}}</div> -->
    <input :value="fktr" @input="updateValue">
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'xxx'
    },
    fktr: {}
  },
  model: {
    prop: 'fktr',
    event: 'andvs'
  },
  computed: {
    base: {
      get () {
        return 42
      }
    },
    result ({ base }) {
      return base + 1
    }
  },
  beforeCreate () {
    console.log(3)
  },
  created () {
    console.log(4)
  },
  beforeMount () {
    console.warn("this is scv beforeMount")
  },
  mounted () {
    console.warn('this is scv mounted')
    this.base = 22
  },
  methods: {
    updateValue (e) {
      this.$emit('andvs', e.target.value)
    }
  }
}
</script>

<style lang="scss">
.scv-tmp {
  color: pink;
  .title {
    color: orange;
  }
}
</style>