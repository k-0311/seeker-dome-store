const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const fileName = path.resolve(__dirname, 'xx', 'big.jpg')
  let stream = fs.createReadStream(fileName)

  // let ws = fs.createWriteStream(path.resolve(__dirname, 'abc.jpg'))

  stream.pipe(res)
})

server.listen(7000, () => { console.log('run...') })

// process.stdin.on('data', function (chunk) {
//   console.log('stream by stdin', chunk)
//   console.log('stream by stdin', chunk.toString())
// })