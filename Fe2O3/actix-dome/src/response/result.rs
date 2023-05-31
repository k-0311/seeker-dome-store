use actix_web::http::StatusCode;
use actix_web::{error, HttpResponse, HttpResponseBuilder};
use derive_more::Display;
use serde_json::json;

#[derive(Display, Debug)]
pub enum NormalResponseError {
    #[display(fmt = "格式化错误 :{}", _0)]
    FormatError(&'static str),
    #[display(fmt = "服务器错误 : {}", _0)]
    ServerError(&'static str),
    #[display(fmt = "数据库错误 : {}", _0)]
    DBError(&'static str),
    #[display(fmt = "未找到目标 : {}", _0)]
    NotFoundError(&'static str),
}

impl error::ResponseError for NormalResponseError {
    fn error_response(&self) -> HttpResponse {
        HttpResponseBuilder::new(self.status_code())
            .insert_header(("Content-Type", "application/json; charset=utf-8"))
            .json(json!({
                "message":self.to_string()
            }))
    }

    fn status_code(&self) -> StatusCode {
        match *self {
            NormalResponseError::FormatError(_) => StatusCode::from_u16(510).unwrap(),
            NormalResponseError::ServerError(_) => StatusCode::from_u16(511).unwrap(),
            NormalResponseError::DBError(_) => StatusCode::from_u16(512).unwrap(),
            NormalResponseError::NotFoundError(_) => StatusCode::from_u16(513).unwrap(),
        }
    }
}
