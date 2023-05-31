use std::io::Result;

use actix_cors::Cors;
use actix_files::Files;
use actix_web::{App, HttpServer};

mod services;
mod response;

use crate::services::simple_config;

// cargo watch -x run 热加载
// cargo build --release
#[actix_web::main] // or #[tokio::main]
async fn main() -> Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default().allow_any_origin().send_wildcard();
        App::new()
            .wrap(cors)
            .service(Files::new("/js", "./page/js").show_files_listing())
            .service(Files::new("/css", "./page/css").show_files_listing())
            .service(Files::new("/img", "./page/img").show_files_listing())
            .configure(simple_config)
    })
    .bind(("127.0.0.1", 8080))?
    .bind(("127.0.0.1", 8081))?
    .bind(("127.0.0.1", 8082))?
    .run()
    .await
}
