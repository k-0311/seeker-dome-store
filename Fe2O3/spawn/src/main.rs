use std::sync::mpsc::{self, Sender};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
fn main() {
    let (tx, rx) = mpsc::channel();
    let tx1 = mpsc::Sender::clone(&tx);
    spawn1(tx);
    spawn2(tx1);
    for received in rx {
        println!("Got: {}", received);
    }
    mutex_fn();
}

fn spawn1(tx: Sender<String>) {
    thread::spawn(move || {
        let vals = vec![
            String::from("a"),
            String::from("b"),
            String::from("c"),
            String::from("d"),
        ];
        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });
}
fn spawn2(tx: Sender<String>) {
    thread::spawn(move || {
        let vals = vec![
            String::from("q"),
            String::from("w"),
            String::from("e"),
            String::from("r"),
        ];
        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });
}

fn mutex_fn() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
            println!("num {}", *num);
            thread::sleep(Duration::from_secs(1));
        });
        handles.push(handle);
    }
    for handle in handles {
        handle.join().unwrap();
    }
    println!("resulet {}", *counter.lock().unwrap());
}
