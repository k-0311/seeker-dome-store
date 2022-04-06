use std::fmt::{self, Display};
struct City {
    name: &'static str,
    lat: f32,
    lon: f32,
}
impl Display for City {
    fn fmt(&self, fmt: &mut fmt::Formatter) -> fmt::Result {
        let lat_c = if self.lat >= 0.0 { 'N' } else { 'S' };
        let lon_c = if self.lon >= 0.0 { 'E' } else { 'W' };
        write!(
            fmt,
            "{}: {:.3}°{} {:.3}°{}",
            self.name,
            self.lat.abs(),
            lat_c,
            self.lon.abs(),
            lon_c
        )
    }
}
#[derive(Debug)]
struct Color {
    red: u8,
    green: u8,
    blue: u8,
}

impl Display for Color {
    fn fmt(&self, fmt: &mut fmt::Formatter) -> fmt::Result {
        write!(fmt, "{:02X}{:02X}{:02X}", self.red, self.green, self.blue,)
    }
}
fn main() {
    for color in [
        Color {
            red: 128,
            green: 255,
            blue: 90,
        },
        Color {
            red: 0,
            green: 3,
            blue: 254,
        },
        Color {
            red: 0,
            green: 0,
            blue: 0,
        },
    ]
    .iter()
    {
        // 在添加了针对 fmt::Display 的实现后，请改用 {} 检验效果。
        println!("{}", *color)
    }
}
