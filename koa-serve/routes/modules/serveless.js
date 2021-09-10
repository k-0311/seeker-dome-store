const router = require('koa-router')()

router.prefix('/serl')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a serl response!'
})

module.exports = router
