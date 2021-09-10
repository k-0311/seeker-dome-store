const fs = require('fs')
const path = require('path')

function moduleInstall ({ modulePath, deep = false, install }) {
  if (!modulePath || typeof modulePath !== "string") throw new Error("Please pass in 'modulePath' which must be string")
  fs.readdirSync(modulePath).forEach(file => {
    let fpath = path.join(modulePath, file) //合并路径
    let stats = fs.statSync(fpath) //获取关于文件的信息。
    if (deep && stats.isDirectory()) moduleInstall({ modulePath: fpath, deep, install }) //是否为文件系统目录
    if (install && stats.isFile()) install(require(fpath)) //是否为常规文件
  })
}

function resolve (url) {
  return path.join(__dirname, '../', url)
}

module.exports = {
  moduleInstall,
  resolve
}