use std::fmt::{self, Display};
#[allow(dead_code)]
pub enum Colors {
    Red,
    Blue,
}

impl Display for Colors {
    fn fmt(&self, fmt: &mut fmt::Formatter) -> fmt::Result {
        fmt.write_str(match self {
            Colors::Red => "red",
            Colors::Blue => "blue",
        })?;
        Ok(())
    }
}

#[allow(dead_code)]
pub enum List {
    Cons(u32, Box<List>),
    Nil,
}
#[allow(dead_code)]
impl List {
    pub fn new() -> Self {
        Self::Nil
    }
    pub fn prepend(self, elem: u32) -> Self {
        Self::Cons(elem, Box::new(self))
    }
    pub fn len(&self) -> u32 {
        match *self {
            Self::Cons(_, ref tail) => 1 + tail.len(),
            Self::Nil => 0,
        }
    }
    pub fn stringify(&self) -> String {
        match *self {
            Self::Cons(head, ref tail) => {
                format!("{},{}", head, tail.stringify())
            }
            Self::Nil => {
                format!("Nil")
            }
        }
    }
}

#[allow(dead_code)]
#[derive(Debug)]
#[repr(u8)]
enum WeaponLevel {
    None = 0,
    Level1 = 1,
    Level2 = 2,
    Level3 = 3,
}
#[allow(dead_code)]
impl WeaponLevel {
    pub fn up(self) -> Self {
        match self {
            WeaponLevel::None => WeaponLevel::Level1,
            WeaponLevel::Level1 => WeaponLevel::Level2,
            WeaponLevel::Level2 => WeaponLevel::Level3,
            WeaponLevel::Level3 => WeaponLevel::Level3,
        }
    }
    pub fn down(self) -> Self {
        match self {
            WeaponLevel::None => WeaponLevel::Level1,
            WeaponLevel::Level1 => WeaponLevel::Level1,
            WeaponLevel::Level2 => WeaponLevel::Level1,
            WeaponLevel::Level3 => WeaponLevel::Level2,
        }
    }
}
