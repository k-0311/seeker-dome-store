use crate::components::*;
use crate::resources::*;

use specs::{Join, Read, ReadStorage, System, WriteStorage};
pub struct UpdatePos;

impl<'a> System<'a> for UpdatePos {
    type SystemData = (
        Read<'a, DeltaTime>,
        ReadStorage<'a, Velocity>,
        WriteStorage<'a, Position>,
    );
    fn run(&mut self, data: Self::SystemData) {
        let (delta, velocity, mut positions) = data;
        let delta = delta.0;
        for (vel, pos) in (&velocity, &mut positions).join() {
            pos.x += vel.x * delta;
            pos.y += vel.y * delta;
        }
    }
}
