const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './examples/main.js',
    devServer: {
        //DevServer相关的配置
        contentBase: path.join(__dirname, '/'),
        proxy: {
            '/log': 'http://192.168.251.142:9508'
        },
        compress: true, //压缩
        port: 8001, //端口号
        open: true, //第一次打开浏览器
        hot: true, //是否监听
        publicPath: "/" //访问的目录
    },
    devtool: '#source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: '/node_modules/'
        }]
    },
    plugins: [
        //将js自动插入到html里
        new HtmlWebpackPlugin({
            inject: "head",
            template: './examples/index.html',
            filename: 'index.html',
        }),
        new webpack.HotModuleReplacementPlugin() //引入热更新插件
    ]
}