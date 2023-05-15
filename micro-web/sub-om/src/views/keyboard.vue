<template>
  <form action="">
    <input type="text" v-for="item in 3" :key="item">
    <div class="div-input" :tabindex="0" v-for="(item,index) in 3" :key="item" @keydown.enter="enter(index)"></div>
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
    </select>
    <button>提交</button>
  </form>
</template>

<script>
// v-on 在监听键盘事件时，如果元素没有获取焦点，keyup事件无法生效
// 可通过 tabindex=0 来给非input节点获取焦点
export default {
  data () {
    return {
    }
  },
  methods: {
    enter (index) {
      alert(`dev-${index}`)
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  margin: auto;
  width: 600px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.div-input {
  height: 21px;
  border: 1px solid #000;
  border-radius: 2px;
}
</style>