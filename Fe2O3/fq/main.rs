fn xxx(x: i32, y: f64) {
  clone_fn();
  // println!("this is xxx fn and options -> x：{0}, y：{1}", x, y)
}
fn main() {
  while_fn();
  xxx(15, 6.6);
  let a = "ubi";
  let b = "scvr";
  // println!("fuck, world!");
  // println!("{0} & {1} no.1 {{ --- }} \\.", a, b);
  let mut x = 5;
  x += 1;
  x *= 2;
  // println!("x == {}", x);

  // let tup: (i32, f64, u8) = (666, 6.4, 32);
  // let (q, w, e) = tup;

  let tup_mix = ("ubi", 996, 3.14, false);
  let (a, b, c, d) = tup_mix;

  // println!("{0},{1},{2},{3}", a, b, c, d);

  let a = [1, 2, 3, 4, 5];
  // a 是一个长度为 5 的整型数组
  let b = ["January", "February", "March"];
  // b 是一个长度为 3 的字符串数组
  let c: [i32; 5] = [1, 2, 3, 4, 5];
  // c 是一个长度为 5 的 i32 数组
  let d = [3; 5];
  // 等同于 let d = [3, 3, 3, 3, 3];
  let first = a[0];
  let second = a[1];
  // 数组访问
  // a[0] = 123; // 错误：数组 a 不可变
  let mut a = [1, 2, 3];
  a[0] = 4; // 正确
            // println!("res_xxx return value {}", res_xxx());
            // println!("ssss_gurite return value {}", ssss_gurite(1, 2));
}

fn ssss_gurite(a: u8, b: i8) -> i32 {
  let x = 5;
  let y = {
    let x = 0;
    x + 3
  };
  println!("x is {0}; y is {1}", x, y);

  println!("this is ssss_gurite fn and options -> a：{0}b：{1}", a, b);
  return x + y;
}

fn res_xxx() -> i32 {
  return 998;
}

fn while_fn() {
  let mut sum = 0;
  while sum < 10 {
    sum += 1;
  }
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for v in arr.iter() {
    // println!("value：{}", v)
  }
  for i in 0..9 {
    // println!("a[{}] = {}", i, arr[i]);
  }

  let mut i = 0;
  let list = [1, 2, 3, 4, 5, 6];
  // 无限循环
  let index = loop {
    if list[i] == 4 {
      break i;
    }
    i += 1;
  };
  // println!("loop \'i\' {}", index);
}

fn clone_fn() {
  let s0 = 666;
  //基础类型 s0 被声明有效
  let s1 = String::from("and vs");
  let s2 = s1.clone(); //克隆 s1 不会使 s1失效
  let sx = s1; //此时 s1 失效
               // println!("{}", sx);

  let s3 = fk_one(); //s3 获得函数返回值所有权
  let (s4, s_0) = fk_two(s2, s0); // s2 被当作参数移动到函数里此处开始 s2 无效;
                                  // println!("{}", s0); // s0 的值被当作参数传入函数, 但 s0 是基本类型，依然有效
                                  // println!("{} {} {}", s3, s4, s_0);
}

fn fk_one() -> String {
  return String::from("fuck tr");
  //被当作函数返回值的变量所有权将会被移动出函数并返回到调用函数的地方，而不会直接被无效释放。
}

fn fk_two(s1: String, s2: i32) -> (String, i32) {
  reference();
  return (s1, s2);
}

fn reference() {
  let s1 = String::from("fq");
  let mut s2 = &s1;
  let s3 = s1;
  s2 = &s3;
  // println!("{}", s2);
  slice()
}

fn slice() {
  let sss = String::from("scvr");
  let part1 = &sss[0..2];
  let part2 = &sss[2..];
  println!("{0} {1}", part1, part2);
  struct_fn()
}

struct Site {
  domain: String,
  name: String,
  nation: String,
  found: u32,
}

fn struct_fn() {
  let domain = String::from("www.runoob.com");
  let name = String::from("RUNOOB");
  let runoob = Site {
    domain,
    name,
    nation: String::from("China"),
    found: 2013,
  };
  struct Color(u8, u8, u8);
  struct Point(f32, f32);
  let white = Color(255, 255, 255);
  let location = Point(3.2, 6.6);

  println!("{}", white.0);
  println!("{}", location.1);
  computele()
}

struct rectangle {
  w: u32,
  h: u32,
}
impl rectangle {
  fn area(&self) -> u32 {
    return self.w * self.h;
  }
}

fn computele() {
  let rect1 = rectangle { w: 60, h: 60 };
  println!("{}", rect1.area());
  struct2()
}

struct SCC {
  w: u32,
  h: u32,
}
impl SCC {
  fn create(w: u32, h: u32) -> SCC {
    SCC { w, h }
  }
}

fn struct2() {
  let scc = SCC::create(10, 20);
  enum_fn()
}

fn enum_fn() {
  enum Book {
    Papery { idx: u32, x: u8, c: f32 },
    Electronic { url: String },
  }
  let book = Book::Papery {
    idx: 66,
    x: 1,
    c: 3.6,
  };
  // let ebook = Book::Electronic {
  //   url: String::from("aaaa"),
  // };

  match book {
    Book::Papery { idx, x, c } => {
      println!("{} {} {}", idx, x, c)
    }
    Book::Electronic { url } => {
      println!("{}", url)
    }
  }

  nation::government::govern();
}

enum Option<T> {
  Some(T),
  None,
}

mod nation {
  pub mod government {
    pub fn govern() {}
  }
  mod congress {
    pub fn legislate() {}
  }
  mod court {
    fn judicial() {
      super::congress::legislate();
    }
  }
}
