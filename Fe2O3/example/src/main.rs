// use std::env::Args;
#[allow(dead_code)]
fn main() {
    // let args: Args = std::env::args();
    // println!("{:?}", args);
    // let vvv = vec![1, 2];
    // let p1 = &vvv[..&vvv.len() - 1];
    // let p2 = &vvv[1..];
    // println!("{:?}", p1);
    // println!("{:?}", p2);
    // let p3 = p1.iter().zip(p2);
    // p3.map(|(a, b)| {});
    // vecotrs_test();
    // matrix_test();
    // contour_test();
    // let s1 = "aaaa".to_string();
    // let x1 = &s1[0..2];
    // println!("{}", x1);
}

mod dome_enum;
mod linear_algebra;
use crate::linear_algebra::*;

#[allow(dead_code)]
fn vecotrs_test() {
    // let vt1 = Vector::new(vec![3.0, 7.0]);
    // let vt2 = vt1.add(vec![5.0, 8.0]);
    // let vt3 = vt2.subtract(vec![5.0, 6.0]);
    // let vt4 = vt3.scale_by(2.0);
    // let vt5 = vt4.dot_product(vec![2.0, 2.0]);
    // println!("{}", vt3.length());
    // println!("{}", vt5);

    // let xt1 = vt1.normalize();
    // println!("{:?}", xt1);
    // println!("{}", xt1.length());

    let vt1 = Vector::new(vec![2.0, 4.0]);
    let vt2 = Vector::new(vec![4.0, 8.0]);
    println!("{}", vt1.have_same_direction_with(vt2));

    let vt3d = Vector::new(vec![1.0, 2.0, 2.0]);
    println!("{:?}", vt3d.cross_product(vec![2.0, 1.0, 1.0]));

    let angle1 = Vector::new(vec![0.0, 4.0]);
    let angle2 = Vector::new(vec![4.0, 4.0]);
    println!("{:?}", angle1.angle_between(angle2));

    let eq1 = Vector::new(vec![1.0, 2.0]);
    let eq2 = Vector::new(vec![1.0, 3.0]);
    println!("{}", eq1.equal_to(eq2.components));
}

#[allow(dead_code)]
fn matrix_test() {
    let vector_2d = Vector::new(vec![3.0, 5.0]);
    let vector_3d = Vector::new(vec![3.0, 5.0, 2.0]);
    let matrix_2x_2d = Matrix::new(vec![vec![1.0, 2.0], vec![3.0, 4.0]]);
    let matrix_2x_3d = Matrix::new(vec![vec![1.0, 2.0, 3.0], vec![4.0, 5.0, 6.0]]);
    let matrix_3x_2d = Matrix::new(vec![vec![1.0, 2.0], vec![3.0, 4.0], vec![5.0, 6.0]]);

    let t1 = vector_2d.transform(&matrix_2x_2d);
    println!("{:?}", t1);

    let t2 = vector_3d.transform(&matrix_2x_3d);
    println!("{:?}", t2);

    let t3 = vector_2d.transform(&matrix_3x_2d);
    println!("{:?}", t3);
}

#[allow(dead_code)]
fn contour_test() {
    // let mt1 = Matrix::new(vec![
    //     vec![3.0, -4.0],
    //     vec![0.0, -3.0],
    //     vec![6.0, -2.0],
    //     vec![-1.0, 1.0],
    // ]);
    // let mt2 = Matrix::new(vec![vec![3.0, 2.0, -4.0], vec![4.0, -3.0, 5.0]]);

    // println!("{:?}", mt1.multiply(&mt2));

    let mt3 = Matrix::new(vec![
        vec![1.0, 2.0, 3.0],
        vec![4.0, 5.0, 6.0],
        vec![7.0, 8.0, 9.0],
    ]);
    println!("{:?}", mt3.transpose());

    // let mtm1 = Matrix::new(vec![
    //     vec![1.0, 2.0, 3.0],
    //     vec![4.0, 5.0, 6.0],
    //     vec![7.0, 8.0, 9.0],
    // ]);
    // println!("{:?}", mtm1.cofactor(0, 1));

    // let mtmd = Matrix::new(vec![
    //     vec![1.0, 2.0, 0.0],
    //     vec![0.0, 1.0, 2.0],
    //     vec![2.0, 0.0, 1.0],
    // ]);
    // println!("{:?}", mtmd.adjugate());

    let mtmd = Matrix::new(vec![
        vec![2.0, 3.0, 1.0],
        vec![4.0, 7.0, 2.0],
        vec![3.0, 1.0, 1.0],
    ]);
    println!("{:?}", mtmd.inverse());
}
