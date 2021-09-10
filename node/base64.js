const fs = require('fs-extra')
const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

const imageData = fs.readFileSync(resolve('scc1.png'))
const base64 = imageData.toString('base64')
const _dataBuffer = new Buffer.from(base64, 'base64')

fs.writeFile(resolve(`${Date.now()}.png`), _dataBuffer)
