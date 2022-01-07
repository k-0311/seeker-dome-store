fn main() {
    let mut x1 = String::from("aaa");
    let mut x2 = String::from("bbb");
    let x3 = String::from("ccc");
    let len = change_mut_value(&mut x1, &mut x2, &x3);
    println!("{}", x1);
    println!("{}", x2);
    println!("the length of {} is {}", x3, len);

    let str = String::from("scvr");
    let word = first_word(&str[..]);
    println!("{}", word);
}

fn change_mut_value(x1: &mut String, x2: &mut String, x3: &String) -> usize {
    x1.push_str(" 001");
    x2.push_str(" 002");
    return x3.len();
}

fn first_word(str: &str) -> &str {
    str
}
