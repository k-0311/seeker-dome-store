use std::fs::File;

fn main() {
  let f = File::open("xxx.txt");
  if let Ok(file) = f {
    println!("file opened successfully")
  } else {
    println!("failed to open file")
  }

  let a = [1, 7, 6, 4, 49, 1];
  println!("max = {}", max(&a));
  get_point()
}

fn max(array: &[i32]) -> i32 {
  let mut max_index = 0;
  let mut i = 1;
  while i < array.len() {
    if array[i] > array[max_index] {
      max_index = i;
    }
    i += 1;
  }
  array[max_index]
}

struct Point<T1, T2> {
  x: T1,
  y: T2,
}

impl<T1, T2> Point<T1, T2> {
  fn x(&self) -> &T1 {
    &self.x
  }
  fn y(&self) -> &T2 {
    &self.y
  }
}

fn get_point() {
  let p = Point { x: 20, y: 6.6 };
  println!("p.x = {0} p.y = {1}", p.x(), p.y());
}

enum Option<T> {
  Some(T),
  None,
}

enum Result<T, E> {
  Ok(T),
  Err(E),
}
