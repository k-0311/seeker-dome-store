use std::f64::consts::PI;

#[derive(Debug)]
pub struct Vector {
    pub components: Vec<f64>,
}
#[allow(dead_code)]
impl Vector {
    pub fn new(components: Vec<f64>) -> Self {
        Vector { components }
    }
    fn component_wise_operation<F: Fn(f64, f64) -> f64>(&self, other: Vec<f64>, func: F) -> Vector {
        let components = self
            .components
            .iter()
            .zip(other)
            .map(|(a, b)| func(*a, b))
            .collect::<Vec<f64>>();
        Vector::new(components)
    }
    pub fn add(&self, other: Vec<f64>) -> Vector {
        self.component_wise_operation(other, |a, b| a + b)
    }
    pub fn subtract(&self, other: Vec<f64>) -> Vector {
        self.component_wise_operation(other, |a, b| a - b)
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
    pub fn dot_product(&self, other: &Vec<f64>) -> f64 {
        self.components.iter().zip(other).map(|(a, b)| a * b).sum()
    }
    pub fn normalize(&self) -> Vector {
        self.scale_by(1_f64 / self.length())
    }
    pub fn have_same_direction_with(&self, other: Vector) -> bool {
        let dot_product = self.normalize().dot_product(&other.normalize().components);
        are_equal(dot_product, 1_f64)
    }
    pub fn cross_product(&self, other: Vec<f64>) -> Vector {
        let mut components = vec![];
        let len = self.components.len();

        for i in 0..self.components.len() {
            let idx1 = (i + 1) % len;
            let idx2 = (i + 2) % len;
            let r = self.components[idx1] * other[idx2] - self.components[idx2] * other[idx1];
            components.push(r);
        }

        Vector::new(components)
    }
    pub fn angle_between(&self, other: Vector) -> f64 {
        let a = self.dot_product(&other.components);
        let b = self.length() * other.length();
        let c = (a / b).acos();
        to_degress(c)
    }
    pub fn negate(&self) -> Vector {
        self.scale_by(-1_f64)
    }
    pub fn project_on(&self, other: Vector) -> Vector {
        let normalize = other.normalize();
        normalize.scale_by(self.dot_product(&normalize.components))
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
pub fn to_radians(degress: f64) -> f64 {
    degress * PI / 180.0
}

type Rows = Vec<Vec<f64>>;
#[derive(Debug, Clone)]
pub struct Matrix {
    pub rows: Rows,
}
#[allow(dead_code)]
impl Matrix {
    pub fn new(rows: Rows) -> Self {
        Matrix { rows }
    }
    pub fn columns(&self) -> Rows {
        let mut columns = vec![];
        for i in 0..self.rows[0].len() {
            columns.push(self.rows.iter().map(|v| v[i]).collect::<Vec<_>>());
        }
        columns
    }
    fn component_wise_operation<F: Fn(f64, f64) -> f64>(&self, other: &Matrix, func: F) -> Matrix {
        let new_rows = other
            .rows
            .iter()
            .enumerate()
            .map(|(i, row)| {
                row.iter()
                    .enumerate()
                    .map(|(j, v)| func(self.rows[i][j], *v))
                    .collect::<Vec<_>>()
            })
            .collect::<Vec<_>>();
        Matrix::new(new_rows)
    }
    pub fn add(&self, other: &Matrix) -> Matrix {
        self.component_wise_operation(other, |a, b| a + b)
    }
    pub fn subtract(&self, other: &Matrix) -> Matrix {
        self.component_wise_operation(other, |a, b| a - b)
    }
    pub fn scale_by(&self, number: f64) -> Matrix {
        let rows = self
            .rows
            .iter()
            .map(|row| row.iter().map(|v| v * number).collect::<Vec<_>>())
            .collect::<Vec<_>>();
        Matrix::new(rows)
    }
    pub fn multiply(&self, other: &Matrix) -> Matrix {
        if self.rows[0].len() != other.rows.len() {
            panic!("The number of columns of this matrix is not equal to the number of rows of the given matrix.")
        }

        let columns = other.columns();
        let new_rows = self
            .rows
            .iter()
            .map(|row| {
                columns
                    .iter()
                    .map(|column| row.iter().enumerate().map(|(i, v)| v * column[i]).sum())
                    .collect::<Vec<_>>()
            })
            .collect::<Vec<_>>();

        Matrix::new(new_rows)
    }
    pub fn transpose(&self) -> Matrix {
        Matrix::new(self.columns())
    }
    pub fn determinant(&self) -> f64 {
        if self.rows.len() != self.rows[0].len() {
            panic!("Only matrices with the same number of rows and columns are supported.")
        }
        if self.rows.len() == 2 {
            self.rows[0][0] * self.rows[1][1] - self.rows[0][1] * self.rows[1][0]
        } else {
            // const parts = this.rows[0].map((coef, index) => {
            //     const matrixRows = this.rows.slice(1).map(row => [ ...row.slice(0, index), ...row.slice(index + 1)])
            //     const matrix = new Matrix(...matrixRows)
            //     const result = coef * matrix.determinant()
            //     return index % 2 === 0 ? result : -result
            // })

            self.rows[0]
                .iter()
                .enumerate()
                .map(|(index, coef)| {
                    let new_rows = self.rows[1..]
                        .iter()
                        .map(|row| {
                            let mut new_row = vec![];
                            for (idx, v) in row.iter().enumerate() {
                                if idx != index {
                                    new_row.push(*v)
                                }
                            }
                            new_row
                        })
                        .collect::<Vec<_>>();

                    let result = coef * Matrix::new(new_rows).determinant();
                    if index % 2 == 0 {
                        result
                    } else {
                        -result
                    }
                })
                .sum::<f64>()
        }
    }

    fn without_element_at_index<T>(&self, vec: Vec<T>, index: usize) -> Vec<T> {
        let mut new_vec = vec![];
        for (i, v) in vec.into_iter().enumerate() {
            if i != index {
                new_vec.push(v)
            }
        }
        new_vec
    }
    pub fn minor(&self, i: usize, j: usize) -> f64 {
        let new_rows = self
            .without_element_at_index(self.rows.clone(), i)
            .iter()
            .map(|row| self.without_element_at_index(row.clone(), j))
            .collect::<Vec<_>>();
        Matrix::new(new_rows).determinant()
    }

    pub fn cofactor(&self, i: usize, j: usize) -> f64 {
        let sign = (-1_isize).pow((i + j) as u32);
        let minor = self.minor(i, j);
        (sign as f64) * minor
    }
    pub fn adjugate(&self) -> Matrix {
        let new_rows = self
            .rows
            .iter()
            .enumerate()
            .map(|(i, row)| {
                row.iter()
                    .enumerate()
                    .map(|(j, _)| self.cofactor(i, j))
                    .collect::<Vec<_>>()
            })
            .collect::<Vec<_>>();

        Matrix::new(new_rows).transpose()
    }

    pub fn inverse(&self) -> Matrix {
        let determinant = self.determinant();
        if determinant == 0_f64 {
            panic!("Determinant can't be zero.")
        }
        self.adjugate().scale_by(1_f64 / determinant)
    }
}

#[derive(Debug)]
pub struct Contour {
    vectors: Vec<Vector>,
}
#[allow(dead_code)]
impl Contour {
    pub fn new(vectors: Vec<Vector>) -> Self {
        Contour { vectors }
    }
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
