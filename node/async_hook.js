const async_hooks = require('async_hooks');
const fs = require('fs');
function log (...args) {
  fs.writeSync(1, args.join(' ') + '\n')
}

async_hooks.createHook({
  init (asyncId, type, triggerAsyncId, resource) {
    log('Init: ', `${type}(asyncId=${asyncId}, parentAsyncId: ${triggerAsyncId})`)
  },
  before (asyncId) {
    log('Before: ', asyncId)
  },
  after (asyncId) {
    log('After: ', asyncId)
  },
  destroy (asyncId) {
    log('Destory: ', asyncId);
  }
}).enable()


setTimeout(() => { }, 10000)