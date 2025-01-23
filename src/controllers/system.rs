use crate::{
    models::_entities::users,
    views::system::SystemInfoResponse,
};
use loco_rs::prelude::*;

async fn get_system_info(
    State(ctx): State<AppContext>,
) -> Result<Response> {
    let has_active_user = users::Model::has_active_user(&ctx.db).await?;

    format::json(SystemInfoResponse::new(has_active_user))
}

pub fn routes() -> Routes {
    Routes::new()
        .prefix("/api/system")
        .add("/info", get(get_system_info))
}