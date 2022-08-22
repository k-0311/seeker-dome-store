use std::f64::consts::PI;

#[derive(Debug)]
pub struct Vector {
    pub components: Vec<f64>,
}
#[allow(dead_code)]
impl Vector {
    pub fn new(components: Vec<f64>) -> Vector {
        Vector { components }
    }
    pub fn add(&self, other: Vec<f64>) -> Vector {
        let components = self
            .components
            .iter()
            .zip(other)
            .map(|(a, b)| a + b)
            .collect::<Vec<f64>>();
        Vector::new(components)
    }
    pub fn subtract(&self, other: Vec<f64>) -> Vector {
        let components = self
            .components
            .iter()
            .zip(other)
            .map(|(a, b)| a - b)
            .collect::<Vec<f64>>();
        Vector::new(components)
    }
    pub fn scale_by(&self, number: f64) -> Vector {
        let components = self
            .components
            .iter()
            .map(|x| x * number)
            .collect::<Vec<f64>>();
        Vector::new(components)
    }
    pub fn length(&self) -> f64 {
        let first = self.components[0];
        let last = self.components[self.components.len() - 1];
        first.hypot(last)
    }
    pub fn dot_product(&self, other: Vec<f64>) -> f64 {
        self.components.iter().zip(other).map(|(a, b)| a * b).sum()
    }
    pub fn normalize(&self) -> Vector {
        self.scale_by(1_f64 / self.length())
    }
    pub fn have_same_direction_with(&self, other: Vector) -> bool {
        let dot_product = self.normalize().dot_product(other.normalize().components);
        are_equal(dot_product, 1_f64)
    }
    pub fn cross_product(&self, other: Vec<f64>) -> Vector {
        let mut components = vec![];
        let len = self.components.len();

        for (i, _) in self.components.iter().enumerate() {
            let idx1 = (i + 1) % len;
            let idx2 = (i + 2) % len;
            let r = self.components[idx1] * other[idx2] - self.components[idx2] * other[idx1];
            components.push(r);
        }

        Vector::new(components)
    }
    pub fn angle_between(&self, other: Vector) -> f64 {
        let a = self.dot_product(other.components.clone());
        let b = self.length() * other.length();
        let c = (a / b).acos();
        to_degress(c)
    }
    pub fn negate(&self) -> Vector {
        self.scale_by(-1_f64)
    }
    pub fn project_on(&self, other: Vector) -> Vector {
        let normalize = other.normalize();
        normalize.scale_by(self.dot_product(normalize.components.clone()))
    }
    pub fn with_length(&self, length: f64) -> Vector {
        self.normalize().scale_by(length)
    }
    pub fn equal_to(&self, other: Vec<f64>) -> bool {
        self.components
            .iter()
            .zip(other)
            .all(|(a, b)| are_equal(*a, b))
    }
    pub fn transform(&self, matrix: &Matrix) -> Vector {
        let columns = matrix.columns();

        if columns.len() != self.components.len() {
            panic!("Matrix columns length should be equal to vector components length.")
        }

        let multiplied = columns
            .iter()
            .enumerate()
            .map(|(i, col)| {
                col.iter()
                    .map(|c| *c as f64 * self.components[i])
                    .collect::<Vec<_>>()
            })
            .collect::<Vec<_>>();

        let components = multiplied[0]
            .iter()
            .enumerate()
            .map(|(i, _)| multiplied.iter().map(|col| col[i]).sum())
            .collect::<Vec<f64>>();

        Vector::new(components)
    }
}

const EPSILON: f64 = 0.00000001;
fn are_equal(one: f64, other: f64) -> bool {
    (one - other).abs() < EPSILON
}

fn to_degress(radians: f64) -> f64 {
    radians * 180.0 / PI
}

#[allow(dead_code)]
fn to_radians(degress: f64) -> f64 {
    degress * PI / 180.0
}

type Rows = Vec<Vec<usize>>;
#[derive(Debug, Clone)]
pub struct Matrix {
    pub rows: Rows,
}

impl Matrix {
    pub fn new(rows: Rows) -> Matrix {
        Matrix { rows }
    }
    pub fn columns(&self) -> Rows {
        let mut columns = vec![];
        for (i, _) in self.rows[0].iter().enumerate() {
            columns.push(self.rows.iter().map(|v| v[i]).collect::<Vec<_>>());
        }
        columns
    }
}

pub struct Contour {
    vectors: Vec<Vector>,
}

impl Contour {
    pub fn transform(&self, matrix: &Matrix) -> Contour {
        let new_vectors = self
            .vectors
            .iter()
            .map(|v| v.transform(matrix))
            .collect::<Vec<_>>();
        Contour {
            vectors: new_vectors,
        }
    }
}
