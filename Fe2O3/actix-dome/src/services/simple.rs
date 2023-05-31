use crate::response::NormalResponseError;
use actix_files::NamedFile;
use actix_web::{
    body::BoxBody, get, http::header::ContentType, web, HttpRequest, HttpResponse, Responder,
};
use serde::Serialize;
use std::path::PathBuf;

#[get("/")]
async fn greet() -> Result<NamedFile, NormalResponseError> {
    NamedFile::open(PathBuf::from("./page/index.html"))
        .map_err(|_| NormalResponseError::NotFoundError("页面不存在"))
}

#[derive(Serialize)]
struct SomeObject {
    code: u16,
    data: Vec<u8>,
}
impl Responder for SomeObject {
    type Body = BoxBody;
    fn respond_to(self, _req: &HttpRequest) -> HttpResponse<Self::Body> {
        let body = serde_json::to_string(&self).unwrap();
        HttpResponse::Ok()
            .content_type(ContentType::json())
            .body(body)
    }
}

#[get("/json")]
async fn json_test() -> impl Responder {
    SomeObject {
        code: 0,
        data: vec![1, 2, 3],
    }
}

#[get("/fuck/{name}")]
async fn fuck_world(name: web::Path<String>) -> impl Responder {
    format!("fuck {name}!")
}

#[get("/error")]
async fn return_error() -> Result<&'static str, NormalResponseError> {
    Err(NormalResponseError::ServerError("调试错误"))
}

pub fn simple_config(cfg: &mut web::ServiceConfig) {
    cfg.service(greet)
        .service(json_test)
        .service(fuck_world)
        .service(return_error);
}
