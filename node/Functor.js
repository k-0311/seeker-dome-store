const fs = require('fs-extra');
const fp = require('lodash/fp');
const colors = require('colors-console')

function compose (...fns) {
  return function (x) {
    return fns.reverse().reduce((args, fn) => fn(args), x) //从右开始
  }
}
/* 什么是IO函子
* IO就是输入输出，IO 函子中的 _value 是一个函数，这里是把函数作为值来处理
* IO函子可以把不纯的动作存储到 _value 中，延迟执行这个不纯的操作(惰性执行)，包装当前的操作
* 把不纯的操作交给调用者来处理
*/
class IO {
  // of方法快速创建IO，要一个值返回一个函数，将来需要值的时候再调用函数
  static of (value) {
    return new IO(() => value)
  }
  // 传入的是一个函数
  constructor(fn) {
    this._value = fn
  }

  map (fn) {
    // 这里用的是new一个新的构造函数，是为了把当前_value的函数和map传入的fn进行组合成新的函数
    return new IO(compose(fn, this._value))
  }
}

const ubi = IO.of(process)
  // map需要传入一个函数，函数需要接收一个参数，这个参数就是of中传递的参数process
  // 返回一下process中的execPath属性即当前node进程的执行路径
  .map(p => p.execPath)

// console.log(ubi) // IO { _value: [Function] }


// 上面只是组合函数，如果需要调用就执行下面
// console.log(ubi._value()) // C:\Program Files\nodejs\node.exe


/* 什么是Monad函子
 * Monad 函子是可以变扁的 Pointed 函子，用来解决IO函子嵌套问题，IO(IO(x))
 * 一个函子如果具有 join 和 of 两个方法并遵守一些定律就是一个 Monad 
*/
class Monad {
  static of (value) {
    return new Monad(() => value)
  }
  constructor(fn) {
    this._value = fn
  }
  map (fn) {
    return new Monad(compose(fn, this._value))
  }
  join () {
    return this._value()
  }
  flatMap (fn) {
    return this.map(fn).join()// 同时调用map和join方法
  }
}

const readFile = (filename) => new Monad(() => fs.readFileSync(filename, 'utf-8'))
const print = (x) => new Monad(() => {
  console.log(colors('yellow', x))
  return x
})
/* 执行顺序
 * readFile读取了文件，然后返回了一个IO函子
 * 调用flatMap是用readFile返回的IO函子调用的
 * 并且传入了一个print函数参数
 * 调用flatMap的时候，内部先调用map，当前的print和this._value进行合并，合并之后返回了一个新的函子
 * （this._value就是readFile返回IO函子的函数：
 *      () => {
 *        return fs.readFileSync(filename, 'utf-8')
 *       }
 * ）
 * flatMap中的map函数执行完，print函数返回的一个IO函子，里面包裹的还是一个IO函子
 * 下面调用join函数，join函数就是调用返回的新函子内部的this._value()函数
 * 这个this._value就是之前print和this._value的组合函数，调用之后返回的就是print的返回结果
 * 所以flatMap执行完毕之后，返回的就是print函数返回的IO函子
 **/
const r = readFile('package.json')
  .map(fp.toUpper)// 读完文件之后想要处理数据，怎么办？直接在读取文件之后调用 map 方法即可
  .flatMap(print)
  .join()

/* 什么时候使用Monad?
 *当一个函数返回一个函子的时候，我们就要想到 monad，monad 可以帮我们解决函子嵌套的问题。
 *当我们想要返回一个函数，这个函数返回一个值，这个时候可以调用 map 方法
 *当我们想要去合并一个函数，但是这个函数返回一个函子，这个时候我们要用 flatMap 方法
*/