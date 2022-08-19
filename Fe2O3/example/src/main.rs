use ring::error::Unspecified;
use ring::rand::SecureRandom;
use ring::{hmac, rand};
fn main() -> Result<(), Unspecified> {
    let mut key_value = [0u8; 48];
    let rng = rand::SystemRandom::new();
    rng.fill(&mut key_value)?;
    let key = hmac::Key::new(hmac::HMAC_SHA256, &key_value);
    let message = "legitimate and important message";
    let signature = hmac::sign(&key, message.as_bytes());
    hmac::verify(&key, message.as_bytes(), signature.as_ref())?;

    let vvv = vec![1, 2];
    let p1 = &vvv[..&vvv.len() - 1];
    let p2 = &vvv[1..];
    println!("{:?}", p1);
    println!("{:?}", p2);
    println!("===============================");
    // let p3 = p1.iter().zip(p2);
    // p3.map(|(a, b)| {});
    linear_algebra_test();
    Ok(())
}

mod linear_algebra;
use crate::linear_algebra::*;
fn linear_algebra_test() {
    // let vt1 = Vectors::new(vec![3.0, 7.0]);
    // let vt2 = vt1.add(vec![5.0, 8.0]);
    // let vt3 = vt2.subtract(vec![5.0, 6.0]);
    // let vt4 = vt3.scale_by(2.0);
    // let vt5 = vt4.dot_product(vec![2.0, 2.0]);
    // println!("{}", vt3.length());
    // println!("{}", vt5);

    // let xt1 = vt1.normalize();
    // println!("{:?}", xt1);
    // println!("{}", xt1.length());

    let vt1 = Vectors::new(vec![2.0, 4.0]);
    let vt2 = Vectors::new(vec![4.0, 8.0]);
    println!("{}", vt1.have_same_direction_with(vt2));

    let vt3d = Vectors::new(vec![1.0, 2.0, 2.0]);
    println!("{:?}", vt3d.cross_product(vec![2.0, 1.0, 1.0]));

    let angle1 = Vectors::new(vec![0.0, 4.0]);
    let angle2 = Vectors::new(vec![4.0, 4.0]);
    println!("{:?}", angle1.angle_between(angle2));

    let eq1 = Vectors::new(vec![1.0, 2.0]);
    let eq2 = Vectors::new(vec![1.0, 3.0]);
    println!("{}", eq1.equal_to(eq2.components));
}
