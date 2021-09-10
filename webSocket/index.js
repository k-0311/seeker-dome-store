
const Server = require('./ws');//引入模块
const ws = new Server({ port: 9998 });//创建一个WebSocketServer的实例，监听端口9998
ws.on('data', (data) => {
  console.log('receive data:' + data);
  ws.send('this message from server');
});

ws.on('close', (code, reason) => {
  console.log('close:', code, reason);
});
