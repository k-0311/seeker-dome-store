fn main() {
    let x = "       ";
    let x = x.len();
    // let a: u32 = "42".parse().expect("aaaa");
    let tup = (20, "a", 3.14);
    let a = tup.1;
    let b = tup.2;
    let c = tup.0;
    println!("{} {} {} {}", x, a, b, c);
}
