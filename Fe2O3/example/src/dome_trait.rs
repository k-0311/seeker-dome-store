use std::ops::Add;

pub struct Foo;
pub struct Bar;
#[derive(Debug)]
pub struct FooBar;
#[derive(Debug)]
pub struct BarFoo;

impl Add<Bar> for Foo {
    type Output = FooBar;
    fn add(self, _rsh: Bar) -> FooBar {
        FooBar
    }
}

impl Add<Foo> for Bar {
    type Output = BarFoo;
    fn add(self, _rsh: Foo) -> BarFoo {
        BarFoo
    }
}
pub trait Person {
    fn name(&self) -> String;
    fn hhh(&self) -> String {
        String::from("hhh")
    }
}
pub trait Student: Person {
    fn university(&self) -> String;
}

pub struct Fibonacci {
    x: u32,
    y: u32,
}

impl Fibonacci {
    pub fn new() -> Self {
        Self { x: 0, y: 1 }
    }
}

impl Iterator for Fibonacci {
    type Item = u32;
    fn next(&mut self) -> Option<u32> {
        let n = self.x + self.y;
        self.x = self.y;
        self.y = n;
        Some(self.x)
    }
}
impl Student for Fibonacci {
    fn university(&self) -> String {
        self.y.to_string()
    }
}
impl Person for Fibonacci {
    fn name(&self) -> String {
        self.x.to_string()
    }
}

