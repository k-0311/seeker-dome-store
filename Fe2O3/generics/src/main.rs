struct Point<T, U> {
    x: T,
    y: U,
    z: i32,
}
impl<T, U> Point<T, U> {
    fn mixup<V, W>(self, other: Point<V, W>) -> Point<T, W> {
        Point {
            x: self.x,
            y: other.y,
            z: other.z,
        }
    }
}
fn main() {
    let a = vec![1, 2, 3, 4, 5, 6];
    let b = vec![74, 49, 4, 143, 15, 5];
    let p1 = Point {
        x: 111,
        y: 0.3,
        z: 1,
    };
    let p2 = Point {
        x: 66.3,
        y: "fq",
        z: 888,
    };
    let p3 = p1.mixup(p2);
    println!("{}\n{}\n{}", p3.x, p3.y, p3.z)
}
