export const dataUrlToBlob = base64 => {
  const parts = base64.split(';base64,')
  const mimeType = parts[0].split(':')[1]
  const bytes = window.atob(parts[1]) // atob()是 base64 解码，btoa()是编码
  const u8a = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) {
    u8a[i] = bytes.charCodeAt(i)
  }
  const blob = new Blob([u8a], { type: mimeType })

  return {
    blob
  }
}

/**
 * @description: 
 * @param {Blob | File} blob 原始数据
 * @param {string} type 转换后的数据类型
 * @return {promise}
 */
export const blobTransform = (blob, type = 'base64') => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    if (type === 'base64') {
      // Blob 或 File对象转成 dataURL 详情参考[https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/readAsDataURL]
      // Data URLs，即前缀为 data: 协议的URL，其允许内容创建者向文档中嵌入小文件 详情参考[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/data_URIs]
      fileReader.readAsDataURL(blob)
    } else {
      fileReader.readAsArrayBuffer(blob)
    }
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (err) => {
      reject(new Error(`blobToDataUrl error：${err}`))
    }
  })
}