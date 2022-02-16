use std::collections::HashMap;

enum Ssc {
    Int(i32),
    Float(f64),
    Text(String),
}

fn main() {

    let row = vec![
        Ssc::Int(3),
        Ssc::Float(2.4),
        Ssc::Text(String::from("ssc"))
    ];

    let mut s1 = String::from("foo");
    let s2 = "bar";
    s1.push_str(s2);
    let sx = format!("{}-{}", s1, s2);
    println!("s2 is {}", sx);

    let mut v = vec![20, 30, 40, 50];
    v.push(7);
    for i in &mut v {
        *i /= 10;
        println!("{}", i);
    }

    let team = vec![String::from("scvr"), String::from("ubi")];
    let init = vec![10, 50];
    let scores: HashMap<_, _> = team.iter().zip(init.iter()).collect();
}
