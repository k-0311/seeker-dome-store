enum F1 {
  one = 1,
  two = 2,
  three = 3
}

const f1 = Object.entries(F1)

const fn1 = <T>(args: T) => args

class FN<T, U> {
  constructor(public arg1: T, public arg2: U) {}
  public method(): T {
    return this.arg1
  }
}

interface Picks {
  one: string
  two: number
  three?: boolean
}

function pick2<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}
