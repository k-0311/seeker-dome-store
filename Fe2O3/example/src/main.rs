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
    // let p3 = p1.iter().zip(p2);
    // p3.map(|(a, b)| {});

    let vt1 = Vector::new(vec![1.0, 2.0]);
    let vt2 = vt1.add(vec![5.0, 8.0]);
    let vt3 = vt2.subtract(vec![4.0, 7.0]);
    // let vt4 = vt3.scale_by(-0.5);
    let vt5 = vt3.length();
    println!("{}", vt5);

    Ok(())
}
#[derive(Debug)]
struct Vector {
    components: Vec<f64>,
}

impl Vector {
    fn new(components: Vec<f64>) -> Vector {
        Vector { components }
    }
    fn add(&self, other: Vec<f64>) -> Vector {
        let mut components = vec![];
        for (i, v) in other.iter().enumerate() {
            components.push(self.components[i] + v);
        }
        Vector::new(components)
    }
    fn subtract(&self, other: Vec<f64>) -> Vector {
        let mut components = vec![];
        for (i, v) in other.iter().enumerate() {
            components.push(self.components[i] - v);
        }
        Vector::new(components)
    }
    fn scale_by(&self, number: f64) -> Vector {
        let components = self
            .components
            .iter()
            .map(|x| x * number)
            .collect::<Vec<f64>>();
        Vector::new(components)
    }
    fn length(&self) -> f64 {
        let first = self.components[0];
        let last = self.components[self.components.len() - 1];
        first.hypot(last)
    }
}
