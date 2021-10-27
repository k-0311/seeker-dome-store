//面向切面的程序设计（Aspect-oriented programming，AOP
//又译作面向方面的程序设计、剖面导向程序设计）是计算机科学中的一种程序设计思想
//旨在将横切关注点与业务主体进行进一步分离，以提高程序代码的模块化程度
export const AOP = obj => new Proxy(obj, {
  get (target, key, value, receiver) {
    console.log(`${key}：%c${value}`, 'color:#3FB87D')
    return Reflect.get(target, key, value, receiver)
  }
})