mod dome_enum;
mod dome_struct;
mod dome_trait;

// use crate::dome_enum::*;
// use crate::dome_struct::*;
use crate::dome_trait::*;

fn main() {
    // rectangle();
    // let mut list = List::new();
    // list = list.prepend(1);
    // list = list.prepend(2);
    // list = list.prepend(3);
    // println!("linked list has length: {}", list.len());
    // println!("{}", list.stringify());

    let fibo = Fibonacci::new();

    let str = format!(
        "name is {} and I attend {}. my favorite {}",
        fibo.name(),
        fibo.university(),
        fibo.hhh()
    );
    println!("{}", str);
    let next_b = next_birthday(Some(1));
    println!("{:?}", next_b);
}
fn next_birthday(current_age: Option<u8>) -> Option<String> {
    let next_age: u8 = current_age?;
    Some(format!("Next year I will be {}", next_age))
}
