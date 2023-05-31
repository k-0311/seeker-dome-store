#[derive(Debug, PartialEq, Eq, Copy, Clone)]
#[repr(u8)]
pub enum NextType {
    Safe = 0,
    Store = 1,
    Treasure = 2,
    Normal = 3,
    Elite = 4,
    Boss = 5,
}

pub struct Next {
    pub next_type: NextType,
}
impl Next {
    pub fn new(next_type: NextType) -> Self {
        Next { next_type }
    }
}
