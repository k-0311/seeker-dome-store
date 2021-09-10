const { moduleInstall } = require('../utils')
const modulePath = `${__dirname}/modules`
const koajwt = require('koa-jwt')

module.exports = (app) => {
  app.use(async (ctx, next) => {
    ctx.compress = true
    ctx.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
      "X-Powered-By": "3.2.1",
      "Content-Type": "application/json;charset=utf-8"
    })
    next()
  })


  // app.use((ctx, next) => {
  //   return next().catch((err) => {
  //     if (err.status === 401) {
  //       ctx.status = 401;
  //       ctx.body = 'Protected resource, use Authorization header to get access\n';
  //     } else {
  //       throw err;
  //     }
  //   })
  // })

  // 注意：放在路由前面
  // app.use(koajwt({
  //   secret: 'Gopal_token'
  // }).unless({ // 配置白名单
  //   path: [/\/api\/register/, /\/api\/login/]
  // }))


  moduleInstall({
    modulePath,
    install (_module) {
      app.use(_module.routes(), _module.allowedMethods())
    }
  })
}