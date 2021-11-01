use rand::Rng; //显示导入
use std::cmp::Ordering;
use std::io;
fn main() {
    let secret_number = rand::thread_rng().gen_range(1, 101);
    loop {
        let mut guess = String::new();
        io::stdin()
            .read_line(&mut guess)
            .expect("failed to read line");
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(err) => {
                println!("{}", err);
                continue;
            }
        };
        println!("you guessed: {}", guess);

        // match表达式，匹配方法返回的所有'分支'，根据命中的'分支'执行对应的代码，类似 JS 中的 switch表达式
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("to samll!"),
            Ordering::Equal => {
                println!("you win!");
                break;
            }
            Ordering::Greater => println!("to big!"),
        }
    }
}
