const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    // if (process.env.NODE_ENV === 'serve') {
    // config.plugins.delete('prefetch')
    // }
    config.resolve.alias
      .set('VIEWS', resolve('src/views'))
      .set('@cmp', resolve('src/components'))
    config.optimization.splitChunks({
      chunks: "all",          //async异步代码分割 initial同步代码分割 all同步异步分割都开启
      // minSize: 30000,         //字节 引入的文件大于30kb才进行分割
      // maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      // minChunks: 2,           //模块至少使用次数
      // maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
      // maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
      // automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
      // name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: {//缓存组，将所有加载模块放在缓存里面一起分割打包
        vendors: {//自定义打包模块
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,//优先级，先打包到哪个组里面，值越大，优先级越高
          chunks: 'initial'
        },
        echarts: {
          name: 'chunk-echarts',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?echarts(.*)/
        },
        commons: {
          name: 'chunk-commons',
          minChunks: 2,
          priority: 5,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'analyzer') {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
    }
  }
}
