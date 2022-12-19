<template>
  <div class="paginate">
    <guide></guide>
  </div>
</template>

<script>
import guide from '@/components/guide'
export default {
  components: {
    guide
  },
  data () {
    return {
      position: []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>