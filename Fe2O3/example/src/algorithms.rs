pub fn pigeonhole_sort(array: &mut [i32]) {
    if let (Some(min), Some(max)) = (array.iter().min(), array.iter().max()) {
        let holes_range: usize = (max - min + 1) as usize;
        let mut holes = vec![0; holes_range];
        let mut holes_repeat = vec![0; holes_range];
        for v in array.iter() {
            let index = *v - min;
            println!("{} {}", index, v);
            holes[index as usize] = *v;
            holes_repeat[index as usize] += 1;
        }
        println!("{:?}", holes);
        println!("{:?}", holes_repeat);
        let mut index = 0;
        for i in 0..holes_range {
            while holes_repeat[i] > 0 {
                array[index] = holes[i];
                index += 1;
                holes_repeat[i] -= 1;
            }
        }
        println!("{:?}", array);
    }
}
