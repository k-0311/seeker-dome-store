const router = require('koa-router')()

const User = require('../../controllers/user');

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


router.post('/register', User.register)
router.post('/login', User.login)
router.get('/info', User.userinfo)

module.exports = router
