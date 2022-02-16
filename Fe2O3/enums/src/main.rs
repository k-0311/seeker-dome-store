#[derive(Debug)]
enum AAA {
    bbq,
}
enum Coin {
    Dime(u8),
    Quarter(AAA),
}
fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Dime(num) => num,
        Coin::Quarter(aaa) => {
            println!("{:?}", aaa);
            25
        }
    }
}

fn plus_one(x: Option<u8>) -> Option<u8> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}
fn main() {
    let x = value_in_cents(Coin::Dime(66));
    let z = value_in_cents(Coin::Quarter(AAA::bbq));
    println!("x is {}; z is {}", x, z);
    let num = plus_one(Some(6));
    println!("num is {:?}", num);
}
