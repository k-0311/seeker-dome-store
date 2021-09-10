const microApps = [
  {
    name: 'sub-mo',// 建议name与子项目的package里的name字段保持一致，保持唯一性
    entry: process.env.VUE_APP_SUB_MO,// 子项目入口，生产环境和开发环境地址是不一样的，这里使用了我们之前创建的环境文件中的值
    activeRule: '/sub-mo'// 子项目在主项目中的路由地址，建议后面也是项目名，统一一下会没那么乱
  },
  {
    name: 'sub-ts',// 建议name与子项目的package里的name字段保持一致，保持唯一性
    entry: process.env.VUE_APP_SUB_TS,// 子项目入口，生产环境和开发环境地址是不一样的，这里使用了我们之前创建的环境文件中的值
    activeRule: '/sub-ts'// 子项目在主项目中的路由地址，建议后面也是项目名，统一一下会没那么乱
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 主项目中的挂载容器id
    props: {
      routerBase: item.activeRule, // 主项目下发到子项目，可以在子项目中获取的到，这个到时候在子应用的路由中需要用到，用于设置路由的base属性
    }
  }
})

export default apps