use std::f64::consts::PI;

#[derive(Debug)]
pub struct Vectors {
    pub components: Vec<f64>,
}

impl Vectors {
    pub fn new(components: Vec<f64>) -> Vectors {
        Vectors { components }
    }
    pub fn add(&self, other: Vec<f64>) -> Vectors {
        let components = self
            .components
            .iter()
            .zip(other)
            .map(|(a, b)| a + b)
            .collect::<Vec<f64>>();
        Vectors::new(components)
    }
    pub fn subtract(&self, other: Vec<f64>) -> Vectors {
        let components = self
            .components
            .iter()
            .zip(other)
            .map(|(a, b)| a - b)
            .collect::<Vec<f64>>();
        Vectors::new(components)
    }
    pub fn scale_by(&self, number: f64) -> Vectors {
        let components = self
            .components
            .iter()
            .map(|x| x * number)
            .collect::<Vec<f64>>();
        Vectors::new(components)
    }
    pub fn length(&self) -> f64 {
        let first = self.components[0];
        let last = self.components[self.components.len() - 1];
        first.hypot(last)
    }
    pub fn dot_product(&self, other: Vec<f64>) -> f64 {
        self.components.iter().zip(other).map(|(a, b)| a * b).sum()
    }
    pub fn normalize(&self) -> Vectors {
        self.scale_by(1_f64 / self.length())
    }
    pub fn have_same_direction_with(&self, other: Vectors) -> bool {
        let dot_product = self.normalize().dot_product(other.normalize().components);
        are_equal(dot_product, 1_f64)
    }
    pub fn cross_product(&self, other: Vec<f64>) -> Vectors {
        let mut components = vec![];
        let len = self.components.len();

        for (i, v) in self.components.iter().enumerate() {
            let idx1 = (i + 1) % len;
            let idx2 = (i + 2) % len;
            let r = self.components[idx1] * other[idx2] - self.components[idx2] * other[idx1];
            components.push(r);
        }

        Vectors::new(components)
    }
    pub fn angle_between(&self, other: Vectors) -> f64 {
        let a = self.dot_product(other.components.clone());
        let b = self.length() * other.length();
        let c = (a / b).acos();
        to_degress(c)
    }
    pub fn negate(&self) -> Vectors {
        self.scale_by(-1_f64)
    }
    pub fn project_on(&self, other: Vectors) -> Vectors {
        let normalize = other.normalize();
        normalize.scale_by(self.dot_product(normalize.components.clone()))
    }
    pub fn with_length(&self, length: f64) -> Vectors {
        self.normalize().scale_by(length)
    }
    pub fn equal_to(&self, other: Vec<f64>) -> bool {
        self.components
            .iter()
            .zip(other)
            .all(|(a, b)| are_equal(*a, b))
    }
}

const EPSILON: f64 = 0.00000001;
fn are_equal(one: f64, other: f64) -> bool {
    (one - other).abs() < EPSILON
}

fn to_degress(radians: f64) -> f64 {
    radians * 180.0 / PI
}

fn to_radians(degress: f64) -> f64 {
    degress * PI / 180.0
}