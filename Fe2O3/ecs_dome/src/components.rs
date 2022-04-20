use specs::{Component, VecStorage, World, WorldExt};

#[derive(Debug, Component)]
#[storage(VecStorage)]
#[allow(dead_code)]
pub struct Position {
    pub x: f32,
    pub y: f32,
}

#[derive(Debug, Component)]
#[storage(VecStorage)]
#[allow(dead_code)]
pub struct Velocity {
    pub x: f32,
    pub y: f32,
}

pub fn register_components(world: &mut World) {
    world.register::<Position>();
    world.register::<Velocity>();
}
