fn main() {
    pub trait Summary {
        fn summarize(&self) -> String {
            String::from("(Read more...)")
        }
    }
    pub struct NewsArticle {
        pub headline: String,
        pub location: String,
        pub author: String,
        pub content: String,
    }
    pub struct Tweet {
        pub username: String,
        pub content: String,
        pub reply: bool,
        pub retweet: bool,
    }
    impl Summary for NewsArticle {}
    impl Summary for Tweet {}

    let article = NewsArticle {
        headline: String::from("Penguins win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        author: String::from("Iceburgh"),
        content: String::from("The Pittsburgh Penguins once again are the best"),
    };

    println!("New article available! {}", article.summarize());

    pub fn notify(item: impl Summary) {
        println!("{}", item.summarize())
    }

    let aaa = String::from("aaa");
    let bbb = "xxx";
    let res = longest(aaa.as_str(), bbb, 333);
    println!("{}", res)
}

use std::fmt::Display;
fn longest<'a, T>(xsx: &'a str, y: &'a str, acc: T) -> &'a str
where
    T: Display,
{
    println!("{}", acc);
    if xsx.len() > y.len() {
        xsx
    } else {
        y
    }
}
