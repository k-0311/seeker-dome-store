# 记一次webpack打包node项目

### 1.所有node_modules里的模块都不进行打包

node中包含大量的`fs、path`操作，这些`fs和path`操作在打包完成后将没有操作对象，还会报出很多各样的错误。所以使用`webpack`打包的核心就是拒绝打包一切`node_modules`里的模块，只是将相对路径引用的文件打包到一个文件里。恰巧我们发现`webapck`提供`externals`属性来排除掉不需要打包的模块。

再深入点我们可以发现：像`webpack、nodemon、babel-preset-env`这样的模块是`app`开发环境依赖的包，我们的程序里根本不会require这些模块。

综上可以发现我们只将所有require到的包排除掉就可以了，这个模块对应的也就是`package.json`里`dependencies`下的模块。

因此我们可以使用`externals-dependencies`这个插件配合`externals`属性实现`dependencies`的排除工作

```javascript
//webpack.config.js
const _externals = require('externals-dependencies')
module.exports = {
    //...
    externals: _externals()
    //...
}
```



### 2.target指向node[https://www.webpackjs.com/configuration/target/#target]

官方文档：告知`webpack`为目标(target)指定一个环境

```javascript
//webpack.config.js
module.exports = {
    //...
    target: 'node' //默认为web
    //...
}
```



### 3.增加node配置[https://www.webpackjs.com/configuration/node/]

官方文档：这些选项可以配置是否`polyfill`或 mock 某些 [Node.js 全局变量](https://nodejs.org/docs/latest/api/globals.html)和模块。这可以使最初为`Node.js`环境编写的代码，在其他环境（如浏览器）中运行

```javascript
//webpack.config.js
module.exports = {
  // ...
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true
  }
  // ...
}
```

