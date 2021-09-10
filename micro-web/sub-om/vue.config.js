const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");//测量各个插件和loader所花费的时间
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');//为模块提供中间缓存,首次构建时间没有太大变化，但是第二次开始，构建时间大约可以节约 80%
// const CopyPlugin = require('copy-webpack-plugin');//复制文件
const path = require('path');
const { name } = require('./package');

function resolve (dir) {
  return path.join(__dirname, dir);
}

const port = 5501;

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  devServer: {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',//qiankun 是通过 fetch 去获取子应用注册时配置的静态资源url，所有静态资源必须是支持跨域的，那就得设置允许源了
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/main.scss";`,
      },
    },
  },
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === 'analyzer') {
  //     config.plugin.push(...[
  //       new BundleAnalyzerPlugin()
  //     ])
  //   }
  // },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        'components': resolve('src/components')
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    }
  }
}