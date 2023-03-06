<template>
  <div class="container">
    <div id="content" @dragover="fileDragover" @drop="fileDrop">
      <input type="file" id="input-img" @change="inputChange" />
    </div>
    <!-- <a :download="fileName" :href="imageUrl">普通下载</a> -->
    <button @click="downloadImg">TAP DOWNLOAD</button>
    <div>
      <img :src="imageUrl" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { dataUrlToBlob, blobTransform } from '@/utils/media';
export default {
  setup () {
    const fileName = ref('')
    const imageUrl = ref('')
    const asyncUrl = ref('')


    const randomPhoto = async () => {
      const res = await fetch('https://source.unsplash.com/user/erondu', {
        methods: 'get'
      })
      const blob = await res.blob()
      asyncUrl.value = URL.createObjectURL(blob)
    }
    const chunkUpload = async () => {
      const file = new File(['a'.repeat(2000)], 'some.txt') //File 接口基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件 详情参考[https://developer.mozilla.org/zh-CN/docs/Web/API/File]
      const chunkSize = 500
      for (let start = 0; start < file.size; start += chunkSize) {
        const end = start + chunkSize + 1
        const chunk = file.slice(start, end)
        const formData = new FormData()
        formData.append('data', {
          start,
          end,
          chunk
        })
        await fetch('https://www.example.com', { method: 'post', body: formData }).then(res => res.text())
      }

    }



    const fileDragover = e => { e.preventDefault() }
    const fileDrop = e => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]  // 获取到第一个上传的文件对象
      sizeCheck(file)
    }
    const inputChange = e => {
      const file = e.target.files[0]
      sizeCheck(file)
    }
    const sizeCheck = file => {
      const MAX_FILE_SIZE = 10 * 1024 * 1024
      if (!file) return
      if (file.size > MAX_FILE_SIZE) {
        return alert('文件大小不能超过10M')
      }
      compressCheck(file)
    }
    const compressCheck = file => {
      if (!/\.(jpe?g|png|bmp)$/.test(file.name)) {
        alert('请上传图片')
        return
      }
      fileName.value = `${new Date().getTime()}-${file.name}`
      blobTransform(file, 'base64').then(base64 => {
        compressHandler(base64, file.type)
      })
    }
    /**
     * @description: 
     * @param {number} encoderOptions 从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略
     */
    const compressHandler = (base64, mimeType, encoderOptions = 0.92) => {
      const MAX_WIDTH = 800
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.src = base64
      image.onload = function () {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        // 定义 canvas 大小，也就是压缩后下载的图片大小
        canvas.width = Math.min(MAX_WIDTH, image.width)
        canvas.height = Math.min(image.height * MAX_WIDTH / image.width, image.height)
        ctx.clearRect(0, 0, canvas.width, canvas.height)//清除画布
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)//绘制图片

        imageUrl.value = canvas.toDataURL(mimeType, encoderOptions)
        /**
         * *canvas也可以直接导出为Blob 
         * *第一个参数为 callback 回调方法，callback 的参数就是转换好的 blob 文件信息
         *  */
        canvas.toBlob(blob => {
          console.log("compressHandler -> blob", blob)
        }, mimeType, encoderOptions)
      }
    }
    const downloadImage = () => {
      const { blob } = dataUrlToBlob(imageUrl.value)
      if (window.navigator.msSaveOrOpenBlob) {
        // 兼容 ie 的下载方式
        window.navigator.msSaveOrOpenBlob(blob, fileName.value)
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob) // blob:<origin>/<uuid> -> blob:https://example.org/40a5fb5a-d56d-4a33-b4e2-0acf6a8e5f641 详情参考[https://developer.mozilla.org/zh-CN/docs/Web/API/URL]
        a.setAttribute('download', fileName.value);
        a.click();
        a.remove()
        URL.revokeObjectURL(a.href)
      }
    }


    onMounted(() => {
      // randomPhoto()
    })
    return {
      fileDragover,
      fileDrop,
      inputChange,
      fileName,
      imageUrl,
      asyncUrl,
      downloadImage
    }
  }
}
</script>


<style lang="scss" scoped>
#content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  border: 1px solid brown;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  // background-color: #f8f005;
}
button,
button::after {
  width: 380px;
  height: 86px;
  font-size: 36px;
  font-family: 'Bebas Neue', cursive;
  background: linear-gradient(45deg, transparent 5%, #ff013c 5%);
  border: 0;
  color: #fff;
  letter-spacing: 3px;
  line-height: 88px;
  box-shadow: 6px 0px 0px #00e6f6;
  outline: transparent;
  position: relative;
}

button::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);

  content: 'TAP DOWNLOAD';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 3%,
    #00e6f6 3%,
    #00e6f6 5%,
    #ff013c 5%
  );
  text-shadow: -3px -3px 0px #f8f005, 3px 3px 0px #00e6f6;
  clip-path: var(--slice-0);
}

button:hover::after {
  animation: 1s glitch;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}
</style>