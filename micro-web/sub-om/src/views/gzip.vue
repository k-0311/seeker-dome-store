<template>
  <div>
    <div v-permission="'S'">S</div>
    <div v-permission="'C'">C</div>
    <div v-permission="'V'">V</div>
    <div v-permission="'R'">R</div>
    <component :is="name" v-for="name in clist" :key="name"></component>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import pako from 'pako'
import LZString from 'lz-string'
import aaa from 'components/aaa';
import bbb from 'components/bbb';
export default {
  components: {
    aaa,
    bbb
  },
  setup () {
    onMounted(() => { })
    const lz78 = str => LZString.compress(encodeURIComponent(str))
    const deLz78 = compressed => decodeURIComponent(LZString.decompress(compressed))
    const gzip = str => window.btoa(pako.gzip(encodeURIComponent(str), { to: 'string' }))
    const deGzip = base64 => {
      let strData = window.atob(base64)
      const charData = strData.split('').map(x => x.charCodeAt(0)) // Convert binary string to character-number array
      const binData = new Uint8Array(charData)// Turn number array into byte-array
      const data = pako.inflate(binData)// unzip
      strData = String.fromCharCode(...new Uint16Array(data))// Convert gunzipped byteArray back to ascii string:
      return decodeURIComponent(strData)
    }
    return {
      clist: ['aaa', 'bbb']
    }
  }
}
</script>

<style>
</style>