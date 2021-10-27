# sub-om

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 解决VSCode终端中禁止运行脚本问题
- 右击VSCode图标，选择以管理员身份运行
- 在终端中执行get-ExecutionPolicy，显示Restricted，表示状态是禁止的
- 这时执行set-ExecutionPolicy RemoteSigned
- 此时再执行get-ExecutionPolicy，显示RemoteSigned，则表示状态解禁，可以运行