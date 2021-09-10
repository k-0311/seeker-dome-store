/*
 * @Author: your name
 * @Date: 2021-08-09 17:40:41
 * @LastEditTime: 2021-08-10 10:33:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xdd-front-endd:\proj-d21\micro-web\sub-ts\src\utils\cache.ts
 */
function generateKey(argument: any[]): string {
  try {
    return `${Array.from(argument).join(',')}`
  } catch (_) {
    throw new Error("Can't generate key from function argument")
  }
}

type TargetFun<V> = (...args: any[]) => V
function memoize<V>(fn: TargetFun<V>) {
  return new Proxy<any>(fn, {
    // @ts-ignore
    cache,
    apply(target, thisArg, argsList: any[]) {
      const currentCache: Map<string, any> = (this as any).cache

      // 根据格式化函数生成唯一数值
      const cacheKey: string = generateKey(argsList)

      if (!currentCache.has(cacheKey)) {
        let result = target.apply(thisArg, argsList)
        // 如果是 promise 则缓存 promise，简单判断！
        // 如果当前函数有 then 则是 Promise
        if (result?.then) {
          result = Promise.resolve(result).catch(error => {
            // 发生错误，删除当前 promise，否则会引发二次错误
            // 由于异步，所以当前 delete 调用一定在 set 之后，
            currentCache.delete(cacheKey)
            // 把错误衍生出去
            return Promise.reject(error)
          })
        }
        currentCache.set(cacheKey, result)
      }
      return currentCache.get(cacheKey)
    }
  })
}