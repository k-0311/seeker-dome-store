<template>
  <div class="fold-card">
    
  </div>
</template>

<script>
export default {
  setup () {
    return {
      list: Array.from({ length: 8 }, (_, i) => ({ label: '客户', value: i }))
    }
  }
}
</script>

<style lang="scss" scoped>
.fold-card {
  background: pink;
  box-shadow: 0px 6px 12px 0px #d7e2f1;
}
</style>