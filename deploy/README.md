# xdd-deploy-cli
前端轻量化部署脚手架，支持测试、线上等多环境部署，支持环境配置扩展，配置好后仅需一条命令即可完成整个部署流程。


## 前提条件
能通过ssh连上服务器即可

## 安装
全局安装xdd-deploy-cli
```
npm i xdd-deploy-cli -g
```
查看版本，表示安装成功。

xdd-deploy -V

## 使用
### 1.初始化部署模板
```
xdd-deploy init
```

### 2.配置部署环境
部署配置文件位于deploy文件夹下的`deploy.config.js`,
一般包含`dev`（测试环境）和`prod`（线上环境）两个配置，再有多余的环境配置形式与之类似，只有一个环境的可以删除另一个多余的配置（比如只有`prod`线上环境，请删除`dev`测试环境配置）。

具体配置信息请参考配置文件注释：
```
module.exports = {
  projectName: 'test', // 项目名称
  dev: { // 测试环境
    name: '测试环境',
    script: "npm run build-dev", // 测试环境打包脚本
    host: '123456', // 开发服务器地址
    port: 22, // ssh port，一般默认22
    username: 'root', // 登录服务器用户名
    password: '123456', // 登录服务器密码
    distPath: 'dist',  // 本地打包dist目录
    webDir: '/var/www/html/dev/test',  // // 测试环境服务器地址
  },
  prod: {  // 线上环境
    name: '线上环境',
    script: "npm run build", // 线上环境打包脚本
    host: '123456', // 开发服务器地址
    port: 22, // ssh port，一般默认22
    username: 'root', // 登录服务器用户名
    password: '123456', // 登录服务器密码
    distPath: 'dist',  // 本地打包dist目录
    webDir: '/var/www/html/prod/test' // 线上环境web目录
  }
  // 再还有多余的环境按照这个格式写即可
}
```

### 3.查看部署命令
配置好`deploy.config.js`，运行
```
xdd-deploy --help
```
查看部署命令


### 4.测试环境部署
测试环境部署采用的时`dev`的配置
```
xdd-deploy dev
```
先有一个确认，确认后进入部署流程，完成6步操作后，部署成功！！！


### 5.线上环境部署
线上环境部署采用的时`prod`的配置
```
xdd-deploy prod
```
部署流程和测试环境相同

### 分支，注意message分支不能推送到master分支
- message 分支是带消息的
- master 分支不带分支

### 修改机器人
1. 在企业微信中添加机器人，之后会生成机器人连接地址
2. 对应的机器人连接地址配置到utils/index.js 的axios请求参数中



