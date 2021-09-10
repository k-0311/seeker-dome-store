const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const webpack = require("webpack");
// const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;

module.exports = [
    {
        entry: './index.js',
        //输出的文件名 合并以后的js会命名为km-monitor.min.js
        output: {
            path: path.resolve(__dirname, './lib'),
            filename: 'km-web-monitor.min.js',
            library: 'KMmonitor',
            libraryTarget: 'umd'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader'
                    },
                    exclude: '/node_modules/'
                }
            ]
        }
        // plugins: [
        //     // 开启 Scope Hoisting 功能
        //     new webpack.optimize.ModuleConcatenationPlugin(),
        //     new WebpackDeepScopeAnalysisPlugin()
        // ],
        // optimization: {
        //     nodeEnv: 'production',
        //     minimize: true,
        //     minimizer: [ // 用于配置 minimizers 和选项
        //         new UglifyJsPlugin({
        //             cache: true,
        //             parallel: true,
        //             sourceMap: true // set to true if you want JS source maps
        //         })
        //     ]
        // }
    }
];