<template>
  <div>{{id}}</div>
</template>

<script>
export default {
  props: ['id'],
  mounted () {
    const timer = setInterval(() => {
      console.log(1)
    }, 10000);
    this.$once('hook:beforeDestroy', () => clearInterval(timer))
  }
}
</script>

<style>
</style>