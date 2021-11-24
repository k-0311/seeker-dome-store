fn main() {
    loop_fn(fibo(8));
    range_fn();
    f_c_rev(80, "f");
}

fn loop_fn(mut x: u32) {
    let res = loop {
        x = x / 2;
        println!("x: {}", x);
        if x < 10 {
            break x * x;
        }
    };
    println!("{}", res)
}

fn fibo(mut n: u8) -> u32 {
    let mut x = 1;
    let mut y = 1;
    while n > 0 {
        let temp = y;
        y = x + y;
        x = temp;
        n = n - 1;
        println!("{}", y);
    }
    return y;
}

fn range_fn() {
    for number in (1..8).rev() {
        println!("number: {}", number)
    }
}

fn f_c_rev(v: i32, target: &str) -> i32 {
    const DIFF: i32 = 32;
    return if target == "c" {
        5 * (v - DIFF) / 9
    } else {
        9 * v / 5 + DIFF
    };
}
