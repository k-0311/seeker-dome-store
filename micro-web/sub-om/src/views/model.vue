<template>
  <div id="wrap">
    <div>1111</div>
    <div>2222</div>
  </div>
  <div>
    <img :src="imageUrl" alt="">
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { ref, onMounted } from 'vue';
export default {
  components: {
  },
  setup (props, ctx) {
    const convertToImage = (container, options = {}) => {
      // 设置放大倍数
      const scale = window.devicePixelRatio;

      // 传入节点原始宽高
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      // html2canvas配置项
      const ops = {
        scale,
        width,
        height,
        useCORS: true,
        allowTaint: false,
        ...options
      };

      return html2canvas(container, ops).then(canvas => {
        // 返回图片的二进制数据
        return canvas.toDataURL("image/png");
      });
    }

    const imageUrl = ref('')

    onMounted(() => {
      convertToImage(document.querySelector("#wrap")).then(imgBlobData => {
        imageUrl.value = imgBlobData
      })
    })

    return {
      imageUrl
    }
  }
}
</script>

<style>
#wrap {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>