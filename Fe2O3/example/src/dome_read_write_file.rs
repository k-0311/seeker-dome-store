use std::fs::{self, File};
use std::io::{Error, Write};
pub fn read_write_file(path: &str) -> Result<(), Error> {
    
    let data = fs::read_to_string(path)?;
    let mut new_data = String::from("");

    for (i, v) in data.lines().enumerate() {
        new_data.push_str(format!("{}{}\n", v, i).as_str());
    }

    let mut file = File::create(path)?;
    file.write_all(new_data.as_bytes())?;
    Ok(())
}
