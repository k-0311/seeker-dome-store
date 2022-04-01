use rand::Rng;
use ansi_term::Colour;
fn main() {
    random_password();
    vec_sort();
    struct_sort();
}
fn random_password() {
    const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ\
    abcdefghijklmnopqrstuvwxyz\
    0123456789)(*&^%$#@!~";
    const PASSWORD_SIZE: usize = 7;
    let mut rng = rand::thread_rng();
    let password: String = (0..PASSWORD_SIZE)
        .map(|_| {
            let idx = rng.gen_range(0..CHARSET.len());
            CHARSET[idx] as char
        })
        .collect();
    println!("{}", Colour::Red.paint(password));
}

fn vec_sort() {
    let mut rng = rand::thread_rng();
    let mut vec = vec![];
    let mut vecf: Vec<f32> = vec![];
    for _ in 0..7 {
        vec.push(rng.gen_range(0..100));
        vecf.push(rng.gen_range(0.0..100.0));
    }
    vec.sort();
    vecf.sort_by(|a, b| a.partial_cmp(b).unwrap());
    println!("{:?}", vec);
    println!("{:?}", vecf);
}
#[derive(Debug, Eq, Ord, PartialEq, PartialOrd)]
struct Person {
    name: String,
    age: u32,
}
impl Person {
    pub fn new(name: String, age: u32) -> Self {
        Person { name, age }
    }
}

fn struct_sort() {
    let mut people = vec![
        Person::new("zt".to_string(), 25),
        Person::new("fw".to_string(), 21),
        Person::new("qe".to_string(), 24),
    ];
    people.sort_by(|a, b| a.age.cmp(&b.age));
    println!("{:?}", people);
}
