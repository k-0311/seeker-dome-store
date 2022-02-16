use std::fs;
fn main() {
    let x = fs::read_to_string("aaa.txt");
    println!("{:?}",x);
}
