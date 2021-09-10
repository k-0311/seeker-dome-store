const child_process = require('child_process');

let xxx = child_process.exec('node ora.js -t 3 -m "scvr"', () => { })
xxx.stdout.on('data', function (data) {
  console.log("data", data)
})