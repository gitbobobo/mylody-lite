use axum::http::StatusCode;
use loco_rs::{controller::ErrorDetail, errors::Error};

pub fn error_response<T>(message: String) -> Result<T, Error> {
    Err(Error::CustomError(
        StatusCode::INTERNAL_SERVER_ERROR,
        ErrorDetail::with_reason(message),
    ))
}
