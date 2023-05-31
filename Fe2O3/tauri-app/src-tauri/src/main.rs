#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod auth;
mod neurasthenia;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![auth::greet, auth::auth_check])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
