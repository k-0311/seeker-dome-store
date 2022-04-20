use crate::components::*;
use specs::{Builder, World, WorldExt};

pub fn create_ball(world: &mut World) {
    world
        .create_entity()
        .with(Position { x: 4.0, y: 7.0 })
        .with(Velocity { x: 6.6, y: 3.2 })
        .build();
}
