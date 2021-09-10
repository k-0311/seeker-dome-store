<template>
  <div>
    <div></div>
    <input type="file" id="input-img" @change="change" />
    <div @click="download">下载测试</div>
  </div>
</template>

<script>
import utils, { LocaStor } from '@/utils';
export default {
  data () {
    return {
      fileName: null,
      imageDataURL: null
    }
  },
  created () {
    fetch('https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1906469856,4113625838&fm=26&gp=0.jpg')
      .then(res => res.blob())
      .then(blob => {
        console.log(URL.createObjectURL(blob))
      })
  },
  methods: {
    async chunkUpload () {
      const file = new File(['a'.repeat(10000)], 'test.txt') //File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件 详情参考[https://developer.mozilla.org/zh-CN/docs/Web/API/File]
      const chunkSize = 4000
      const url = 'https://www.example.com'

      for (let start = 0; start < file.size; start += chunkSize) {

        const chunk = file.slice(start, start + chunkSize + 1);
        const formData = new FormData()
        formData.append('data', chunk)

        await fetch(url, { method: 'post', body: formData }).then(res => res.text())
      }
    },
    async downloadBlob () {
      const myRequest = new Request('https://www.example.com/flowers.jpg');//实验中的 Fetch API 接口，详情参考[https://developer.mozilla.org/zh-CN/docs/Web/API/Request]
      const objectURL = await fetch(myRequest).then(res => res.blob()).then(blob => URL.createObjectURL(blob))
      console.log(objectURL)
    },

    change (event) {
      const file = event.target.files[0] //获取文件对象
      this.fileName = `${new Date() - 0}_${file.name}`// 获取文件名称，后续下载重命名
      this.toBase64(file)
      // this.toArrayBuffer(file)
    },
    toArrayBuffer (file) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = (e) => {
        const arrayBuffer = e.target.result
        console.log(arrayBuffer)
      }
    },
    toBase64 (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file) //  Blob 或 File对象转成 dataURL 详情参考[https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL]
      reader.onload = () => {
        const dataURL = reader.result // Data URLs，即前缀为 data: 协议的URL，其允许内容创建者向文档中嵌入小文件 详情参考[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs]
        this.compress(dataURL, file.type)
      }
    },
    compress (base64, mimeType, encoderOptions = 92) {
      const MAX_WIDTH = 800
      const img = document.createElement('img')
      img.crossOrigin = 'anonymous'
      img.src = base64
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = Math.min(MAX_WIDTH, img.width)
        canvas.height = Math.min(img.height * MAX_WIDTH / img.width, img.height)

        ctx.clearRect(0, 0, canvas.width, canvas.height)// 清除画布
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        this.imageDataURL = canvas.toDataURL(mimeType, encoderOptions / 100)
        // canvas也可以直接导出为Blob 
        // 第一个参数为 callback 回调方法，callback 的参数就是转换好的 blob 文件信息
        canvas.toBlob((blob) => {
          console.log(blob)
        }, mimeType, encoderOptions)
      }
    },
    dataUrlToBlob (base64) {
      const parts = base64.split(';base64,')
      const mimeType = parts[0].split(':')[1]
      const bytes = window.atob(parts[1]) // atob()是 base64 解码，btoa()是编码
      const u8a = new Uint8Array(bytes.length)
      for (let i = 0; i < bytes.length; i++) {
        u8a[i] = bytes.charCodeAt(i)
      }
      return new Blob([u8a], { type: mimeType })
    },
    download () {
      const blob = this.dataUrlToBlob(this.imageDataURL)
      if (window.navigator.msSaveOrOpenBlob) {
        // 兼容 ie 的下载方式
        window.navigator.msSaveOrOpenBlob(blob, this.fileName)
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob) // blob:<origin>/<uuid> -> blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641 详情参考[https://developer.mozilla.org/zh-CN/docs/Web/API/URL]
        a.setAttribute('download', this.fileName);
        a.click();
        a.remove()
        URL.revokeObjectURL(a.href)
      }
    },
    toPDF () {

    }
  }
}
</script>

<style>
</style>