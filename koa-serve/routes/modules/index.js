const router = require('koa-router')()
const mime = require('mime-types');
const fs = require('fs');
const { resolve } = require('../../utils')

router.get('/', async (ctx, next) => {
  return ctx.body = {
    code: 0,
    msg: 'welcome to ubi'
  }
})

router.post('/', async (ctx, next) => {
  return ctx.body = {
    code: 0,
    msg: 'access denied'
  }
})

router.post('/detail', async (ctx, next) => {
  if (!ctx.request.body.name) {
    return ctx.body = {
      code: 1,
      msg: '查无此人'
    }
  }
  return ctx.body = {
    code: 0,
    data: {
      name: 'xxx',
      type: 'xxx',
      alive: 'xxx',
      mastery: 'xxxxxxx',
      confidentiality: 'xxxxxxxxxx',
      record: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
  }
})

router.post('/info', async (ctx, next) => {
  if (ctx.request.body.uid != '0311') {
    return ctx.body = {
      code: 1,
      msg: '权限不足'
    }
  }
  return ctx.body = {
    code: 0,
    data: {
      outfit: 'ubi',
      member: ['raven', 'soviet', 'H2OB', 'queen', 'dog leader', 'TGA', 'pink', 'lighthouse', 'old driver', 'lily', 'sakura', 'rbq']
    }
  }
})

router.get('/stream', async (ctx, next) => {
  ctx.compress = false
  const filePath = resolve('/static/images/big.jpg')
  // const file = fs.readFileSync(filePath);// 读取文件	    
  const stream = fs.createReadStream(filePath)
  ctx.set('content-type', mime.lookup(filePath))// 读取图片文件类型 && 设置返回类型
  return ctx.body = stream
  // return ctx.body = file
})
module.exports = router
