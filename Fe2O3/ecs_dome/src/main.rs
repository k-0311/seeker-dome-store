use specs::{DispatcherBuilder, World, WorldExt};

mod components;
mod entities;
mod resources;
mod systems;

use crate::components::*;
use crate::entities::*;
use crate::resources::*;
use crate::systems::*;

fn main() {
    let mut world = World::new();
    register_components(&mut world);
    world.insert(DeltaTime(0.1));
    create_ball(&mut world);

    {
        let mut delta = world.write_resource::<DeltaTime>();
        *delta = DeltaTime(0.05);
    }

    let mut dispatcher = DispatcherBuilder::new()
        .with(HelloWorld, "hello_world", &[])
        .with(UpdatePos, "update_pos", &["hello_world"])
        .with(HelloWorld, "hello_world_update", &["update_pos"])
        .build();
    dispatcher.dispatch(&mut world);
    world.maintain();
}
