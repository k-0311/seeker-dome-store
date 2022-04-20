use specs::{Join, ReadStorage, System};

use crate::components::*;
pub struct HelloWorld;
impl<'a> System<'a> for HelloWorld {
    type SystemData = ReadStorage<'a, Position>;
    fn run(&mut self, data: Self::SystemData) {
        let positions = data;
        for position in positions.join() {
            println!("hello, {:?}", &position);
        }
    }
}
