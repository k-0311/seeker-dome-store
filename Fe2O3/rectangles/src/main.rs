#[derive(Debug)]
struct Rect {
    w: u32,
    h: u32,
}
impl Rect {
    fn area(&self) -> u32 {
        return self.w * self.h;
    }
    fn update(&mut self, w: u32, h: u32) {
        self.w = w;
        self.h = h;
    }
}

impl Rect {
    fn square(size: u32) -> Rect {
        return Rect { w: size, h: size };
    }
}

fn main() {
    let mut rect = Rect { w: 10, h: 20 };
    rect.update(10, 30);
    println!(
        "The area of the rectangle is {} square pixels.",
        rect.area()
    );
    let sq = Rect::square(5);
    println!("{:#?}", sq);
}
