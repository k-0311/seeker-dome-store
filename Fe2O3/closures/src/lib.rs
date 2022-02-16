fn main() {}

#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_my_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    shoes.into_iter().filter(|s| s.size == shoe_size).collect()
}
#[test]
fn filters_by_size() {
    let shoes = vec![
        Shoe {
            size: 10,
            style: String::from("aaa"),
        },
        Shoe {
            size: 11,
            style: String::from("bbb"),
        },
        Shoe {
            size: 12,
            style: String::from("ccc"),
        },
    ];
    let in_my_size = shoes_in_my_size(shoes, 11);
    assert_eq!(in_my_size,
        vec![
          Shoe {size: 11,style: String::from("bbb")}
        ]
    ); 
}
