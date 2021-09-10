npm link :  将 **package.json** 中 **bin** 字段中指定的命令链接到全局环境。 

npm unlink: 如果项目不再需要该模块，可以在项目目录内使用npm unlink命令，删除符号链接。

```json
"bin":{
    "nsx": "app.js"
}
```

```javascript
//app.js文件
`#!/usr/bin/env node` //指定当前脚本由node.js进行解析 
//do something........
```

完成上面3步后可以直接通过 nsx <order> 执行一些命令:  nsx -v nsx -h 等.....
