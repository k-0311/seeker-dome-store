

// 定义三个状态常量
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入 resolve 和 reject 方法
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }
  status = PENDING //存储状态的变量，初始值是 pending
  value = null//成功之后的值
  reason = null//失败之后的值
  onFulfilledCallbacks = []//存储成功回调函数
  onRejectedCallbacks = []//存储失败回调函数

  //更改成功后的状态
  resolve = (value) => {
    //只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      this.status = FULFILLED//状态修改为成功
      this.value = value//保存成功的值
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }
  //更改失败后的状态
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED//状态修改为失败
      this.reason = reason//保存失败后的原因
      while (this.onRejectedCallbacks.length) {
        //将所有失败的回调拿出来执行
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }
  then (onFulfilled, onRejected) {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }

    //为了链式调用这里直接创建一个内部的 promise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        //创建一个微任务等待 promsie2 完成初始化
        queueMicrotask(() => {
          try {
            //获取成功回调函数的执行结果
            const x = onFulfilled(this.value)
            //传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      const rejectedMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason)
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      //判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask()
      } else if (this.status === REJECTED) {
        rejectedMicrotask()
      } else if (this.status === PENDING) {
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask)
        this.onRejectedCallbacks.push(rejectedMicrotask)
      }
    })
    return promise2
  }
  static resolve (parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter
    }
    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter)
    })
  }
  static reject (reason) {
    return new MyPromise((_, reject) => {
      reject(reason)
    })
  }
}

function resolvePromise (_p, x, resolve, reject) {

  // 如果相等了，说明 return 的是自己，抛出类型错误并返回
  if (_p === x) {
    return reject(new TypeError('chaining cycle detected for promise #<Promise>'))
  }


  if (typeof x !== 'object' && typeof x !== 'function') {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x)
  } else {
    if (x === null) return resolve(x)
    let then
    try {
      then = x.then// 把 x.then 赋值给 then 
    } catch (error) {
      return reject(error)
    }

    if (typeof then !== 'function') {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x)
    } else {
      let called = false
      try {
        then.call(
          x,// this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          y => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          r => {
            if (called) return;
            called = true;
            reject(r);
          })
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    }
  }


  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else {
    resolve(x)
  }
}

MyPromise.deferred = function () {
  const result = {}
  result.promsie = new MyPromise(function (resolve, reject) {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}
// export default MyPromise

//===============测试用例=======================

const promise = new MyPromise((resolve, reject) => {
  resolve('succ')
})

promise.then().then().then(value => console.log(value))