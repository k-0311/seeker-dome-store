#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub fn auth_check(name: &str) -> Vec<usize> {
    if name == "sir" {
        vec![101]
    } else {
        vec![]
    }
}