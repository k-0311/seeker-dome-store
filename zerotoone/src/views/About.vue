<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <scv @hook:mounted="listenMounted" v-model='fq'></scv>
    <div style="margin-top:30px" @click="random">this is about fq: {{fq}}</div>


    <div class="base-coupons-2" :style="{'--bg-color':color}"></div>
    <div class="base-coupons-3" :style="{'--bg-color':color}"></div>
    <div class="base-coupons-4" :style="{'--bg-color':color}"></div>
    <div class="base-coupons-5" :style="{'--bg-color':color}"></div>
  </div>
</template>

<script>
import scv from '@cmp/scv';
import pako from 'pako'
import LZString from 'lz-string'
export default {
  components: {
    scv
  },
  data () {
    return {
      fq: '',
      color: '#FDAB11'
    }
  },
  beforeCreate () {
    console.log(0)
  },
  created () {
    console.log(1)
    // let a = this.lz78('艾丽卡')
    // console.log(a)
    // console.log(this.unlz78(a))
    this.$on('hook:beforeMount', () => {
      console.log('this is about beforeMount')
    })
    this.$on('hook:mounted', () => {
      console.warn('this is about mounted')
      this.$nextTick(() => {
        console.log(new Date() - this.$store.state.pageLoadStartTime)//页面加载时间
      })
    })
    this.$on('hook:destroyed', () => {
      console.log(new Date() - this.$store.state.pageLoadStartTime)//页面停留时间
    })
  },
  methods: {
    random () {
      this.fq = Math.random().toString().substr(-5)
    },
    listenMounted () {
      //通过 @hook 监听子组件的生命周期【@hook:(生命周期)】
      setTimeout(() => {
        console.log('listen scv mounted success')
      }, 3000)
    },
    //lz78压缩
    lz78 (str) {
      return LZString.compress(encodeURIComponent(str))
    },
    unlz78 (compressed) {
      return decodeURIComponent(LZString.decompress(compressed))
    },
    //gzip压缩
    gzip (str) {
      var binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' })// encodeURIComponent 用于解决中文乱码问题
      return btoa(binaryString) //编码
    },
    ungzip (b64Data) {
      var strData = atob(b64Data)//解码，对应 zip 中的 btoa 
      var charData = strData.split('').map(x => x.charCodeAt(0)) // Convert binary string to character-number array
      var binData = new Uint8Array(charData)// Turn number array into byte-array
      var data = pako.inflate(binData)// unzip
      strData = String.fromCharCode(...new Uint16Array(data))// Convert gunzipped byteArray back to ascii string:
      return decodeURIComponent(strData)
    }
  }
}
</script>

<style lang="scss" scoped>


.base-coupons-2 {
  margin-top: 20px;
  margin-left: 6px;
  width: 698px;
  height: 148px;
  position: relative;
  background-color: var(--bg-color);

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 6px;
    top: 0;
    left: -6px;
    background-image: linear-gradient(
        to bottom,
        var(--bg-color) 6px,
        transparent 6px,
        transparent
      ),
      radial-gradient(
        12px circle at 0px 12px,
        transparent 6px,
        var(--bg-color) 6px
      );
    background-size: 6px 18px;
  }
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 6px;
    top: 0;
    right: -6px;
    background-image: linear-gradient(
        to bottom,
        var(--bg-color) 6px,
        transparent 6px,
        transparent
      ),
      radial-gradient(
        12px circle at 6px 12px,
        transparent 6px,
        var(--bg-color) 6px
      );
    background-size: 6px 18px;
  }
}
.base-coupons-3 {
  margin-top: 20px;
  width: 710px;
  height: 148px;
  position: relative;
  background: radial-gradient(
        circle at left center,
        transparent 15px,
        var(--bg-color) 0
      )
      bottom left / 50% 100% no-repeat,
    radial-gradient(circle at right center, transparent 15px, var(--bg-color) 0)
      bottom right / 50% 100% no-repeat;
  border-radius: 10px;
}
.base-coupons-4 {
  margin-top: 20px;
  width: 710px;
  height: 148px;
  position: relative;
  background: radial-gradient(
        circle at right top,
        transparent 10px,
        var(--bg-color) 0
      )
      top left / 510px 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 10px, var(--bg-color) 0)
      bottom left / 510px 51% no-repeat,
    radial-gradient(circle at left top, transparent 10px, var(--bg-color) 0) top
      right / 200px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, var(--bg-color) 0)
      bottom right / 200px 51% no-repeat;
  border-radius: 10px;
  &::before {
    content: '';
    height: 128px;
    border: 1px dashed #fff;
    position: absolute;
    right: 200px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
.base-coupons-5 {
  margin-top: 20px;
  width: 710px;
  height: 148px;
  position: relative;
  background: radial-gradient(
        circle at left top,
        transparent 10px,
        var(--bg-color) 0
      )
      top left / 510px 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 10px, var(--bg-color) 0)
      bottom left / 510px 51% no-repeat,
    radial-gradient(circle at right top, transparent 10px, var(--bg-color) 0)
      top right / 200px 51% no-repeat,
    radial-gradient(circle at right bottom, transparent 10px, var(--bg-color) 0)
      bottom right / 200px 51% no-repeat;
  &::before {
    content: '';
    height: 128px;
    border: 1px dashed #fff;
    position: absolute;
    right: 200px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>