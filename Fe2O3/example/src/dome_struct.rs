use std::convert::From;
#[derive(Debug)]
#[allow(dead_code)]
struct Rectangle {
    w: i32,
    h: i32,
}
#[allow(dead_code)]
impl Rectangle {
    fn rect_area(&self) -> i32 {
        let Self { w, h } = &self;
        let area = w * h;
        println!("area: {}", area);
        area
    }
    fn square(point: Self, len: f32) -> Self {
        let Self { w, h } = point;
        Self {
            w: w + (len as i32),
            h: h + (len as i32),
        }
    }
}
#[allow(dead_code)]
pub fn rectangle() {
    let rect_angle = Rectangle { w: 7, h: 5 };
    rect_angle.rect_area();
    let other = Rectangle::square(rect_angle, 8.5);
    println!("{:?}", other);
}

#[derive(Debug)]
#[allow(dead_code)]
struct Number {
    value: i32,
}
impl From<i32> for Number {
    fn from(value: i32) -> Self {
        Number { value }
    }
}
