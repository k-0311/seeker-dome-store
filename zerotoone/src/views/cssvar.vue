<template>
  <div>
    <ul class="strip-loading loading flex-ct-x">
      <li v-for="v in 6" :key="v" :style="`--line-index: ${v}`">
        <img src="" alt="">
      </li>
    </ul>
    <div class="scvr-a1"></div>
    <div class="scvr-b2"></div>
    <div>{{nso}}</div>
  </div>
</template>

<script>
import { LocaStor } from '@/utils';
export default {
  data () {
    return {
      tr: '111',
      nc: '222',
      vs: '333'
    }
  },
  computed: {
    nso ({ tr, nc, vs }) {
      return `${tr} ${nc} ${vs}`
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.loading {
  display: flex;
  width: 200px;
  height: 200px;
  li {
    border-radius: 3px;
    width: 6px;
    height: calc(var(--line-index) * 5px);
    background-color: #f66;
    & + li {
      margin-left: 5px;
    }
    img {
      object-fit: cover; //图片何种方式适应
    }
  }
}

$a: '../assets/a.png';
$b: '../assets/b.png';

$img-list: ((a1, $a), (b2, $b));

@each $k, $v in $img-list {
  .scvr-#{$k} {
    width: 50px;
    height: 50px;
    background-size: 50px 50px;
    background: url($v) no-repeat center;
  }
}
</style>