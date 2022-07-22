use std::rc::Rc;
mod dome_enum;
mod dome_struct;
mod dome_trait;

// use crate::dome_enum::*;
// use crate::dome_struct::*;
// use crate::dome_trait::*;

fn main() {
    let a = Rc::new(List::Cons(5, Rc::new(List::Cons(10, Rc::new(List::Nil)))));
    let b = List::Cons(3, Rc::clone(&a));
    let c = List::Cons(4, Rc::clone(&a));
}

enum List {
    Cons(i32, Rc<List>),
    Nil,
}
