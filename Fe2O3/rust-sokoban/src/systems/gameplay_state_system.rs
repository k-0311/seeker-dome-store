use specs::{Join, ReadStorage, System, Write};
use std::collections::HashMap;

use crate::{
    components::{Box, BoxSpot, Position},
    resources::{Gameplay, GameplayState},
};
pub struct GameplayStateSystem {}
impl<'a> System<'a> for GameplayStateSystem {
    type SystemData = (
        Write<'a, Gameplay>,
        ReadStorage<'a, Position>,
        ReadStorage<'a, Box>,
        ReadStorage<'a, BoxSpot>,
    );
    fn run(&mut self, data: Self::SystemData) {
      
    }
}
