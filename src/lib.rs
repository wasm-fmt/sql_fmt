mod config;

use sqlformat::QueryParams;

use crate::config::SQLConfig;

#[bridge::formatter]
fn format(source: &str, filename: Option<&str>, config: &SQLConfig) -> Result<String, String> {
    let _ = filename;
    Ok(sqlformat::format(source, &QueryParams::None, &config.to_format_options()))
}
