use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct SystemInfoResponse {
    pub can_register: bool,
}

impl SystemInfoResponse {
    #[must_use]
    pub fn new(has_active_user: bool) -> Self {
        Self {
            can_register: !has_active_user,
        }
    }
}