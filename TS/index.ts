interface President {
  readonly id: number | string
  name: string
  age: number
  [propName: string]: string | number //任意属性
}

let president: President = {
  id: 'top secret',
  name: 'jianguo chuan',
  age: 74,
  gender: 'male'
}

let arr: (number | string)[] = [1, 2, 3, 4, 5, '789', 55]
let fibonacci: Array<number> = [1, 1, 2, 3, 5]

//类型别名
type alias1 = string
type alias2 = number
type aliasT = alias1 | alias2

//字符串字面量
type Str = 'aaa' | 'bbb' | 'ccc'
function sum(x: number, y: string, n: aliasT, str: Str): any {
  return x + y + n + str
}
sum(1, 'a', 0.1, 'bbb') //最后一个参数为字符串字面量，因此只能填指定好的参数

let fuckfn: (x: number, y: number) => any = (x: number, y: number): any => x + y
interface Fuckfn {
  (x: number, y: number): any
}
let fuckTwo: Fuckfn = (xa: number, yb: number) => xa + yb

//重载
function overload(x: number): number
function overload(x: string): string
function overload(x: number | string): any {
  return x
}

interface Cat {
  name: string
  run(): void
}

interface Fish {
  name: string
  swim(): void
}
//断言
function isFish(animal: Cat | Fish) {
  return typeof (animal as Fish).swim === 'function'
}

//元组
let tup: [string, number] = ['xxx', 666]
tup.push('scc') //新增的值 '只能是' 元组中类型的 '联合类型'
// tup.push(false) 报错

//枚举
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}
//枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
//编译后会变成 ↓
// const Days = {
//   0: 'Sun',
//   1: 'Mon',
//   2: 'Tue',
//   3: 'Wed',
//   4: 'Thu',
//   5: 'Fri',
//   6: 'Sat',
//   Sun: 0,
//   Mon: 1,
//   Tue: 2,
//   Wed: 3,
//   Thu: 4,
//   Fri: 5,
//   Sat: 6
// }

//常数枚举
const enum Directions {
  Up,
  Down,
  Left,
  Right
}
let directions = [
  Directions.Up,
  Directions.Down,
  Directions.Left,
  Directions.Right
]
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
//上例的编译结果是：
//var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

class Outfit {
  public constructor(
    private readonly SCVR: string,
    public UBI: number,
    protected EG7: boolean
  ) {}
  show() {
    console.log(this.SCVR)
    console.log(this.UBI)
    console.log(this.EG7)
  }
}

let outfit: Outfit = new Outfit('tag', 999, false)
outfit.show()

/*抽象类
 *抽象类是不允许被实例化
 *抽象类中的抽象方法必须被子类实现
 */
abstract class McLaren {
  constructor(public name: string) {}
  abstract run(): string
}

class M650s extends McLaren {
  run() {
    console.log(this.name)
    return '666'
  }
}

let m650s = new M650s('ennnnnnnnnnnn')
m650s.run()

//类与接口
interface Alarm {
  alert(): void
}
interface Light {
  on(): void
  off(): void
}
//接口继承
interface Ifv extends Alarm {
  speed(): void
}

let ifv: Ifv = {
  alert() {},
  speed() {}
}

class Door {}
class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('securityDoor alert')
  }
}

//多接口
class Car implements Alarm, Light, Ifv {
  static uid: string | number
  static uuid(): void {}
  constructor() {}
  alert() {
    console.log('car alert')
  }
  on() {
    console.log('open car fogLight')
  }
  off() {
    console.log('close car fogLight')
  }
  speed() {
    console.log('500km/s')
  }
}

//接口继承类【构造函数、静态属性、静态方法 不会被继承】
interface Magic extends Car {
  type: string
}

let magic: Magic = {
  type: 'tank',
  alert() {},
  on() {},
  off() {},
  speed() {}
}
// 泛型
// 注意！必需的类型参数不能跟在可选类型参数之后 <T = string, E> 会报错
function something<T, E = number>(tup: [T, E]): [E, T] {
  return [tup[1], tup[0]]
}

interface SSSS {
  <T = number>(a: number, b: T): Array<T>
}
let build: SSSS = <T>(x: number, y: T): Array<T> => Array(x).map(_ => y)

//泛型参数提前到接口名上 【也可以使用默认参数】
interface S1<T = number> {
  (x: number, y: T): Array<T>
}
//此时在使用泛型接口的时候，需要定义泛型的类型
let buildMore: S1<any> = <T>(x: number, y: T): Array<T> => Array(x).map(_ => y)

//泛型类
class GenericNumber<T = number> {
  zero: T
  add: (x: T, y: T) => T
}
