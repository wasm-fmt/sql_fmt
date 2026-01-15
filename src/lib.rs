mod config;

use sqlformat::QueryParams;
use wasm_bindgen::prelude::*;

pub use crate::config::Config;
use crate::config::SQLConfig;

/// Formats a SQL string with optional configuration.
#[wasm_bindgen]
pub fn format(
    #[wasm_bindgen(param_description = "The SQL string to format")] input: &str,
    #[wasm_bindgen(param_description = "Optional formatter config")] config: Option<Config>,
) -> Result<String, String> {
    let config = config
        .map(|x| serde_wasm_bindgen::from_value::<SQLConfig>(x.into()))
        .transpose()
        .map_err(|op| op.to_string())?
        .unwrap_or_default();

    Ok(sqlformat::format(input, &QueryParams::None, &config.to_format_options()))
}
