use serde::Deserialize;
use sqlformat::FormatOptions;

#[derive(Deserialize, Clone, Copy)]
#[serde(rename_all = "lowercase")]
pub enum IndentStyle {
    Tab,
    Space,
}

#[derive(Deserialize, Clone, Copy)]
#[serde(rename_all = "lowercase")]
pub enum Dialect {
    Generic,
    PostgreSql,
    SQLServer,
}

#[derive(Deserialize, Clone, Default)]
pub struct LayoutConfig {
    #[serde(alias = "indentStyle")]
    pub indent_style: Option<IndentStyle>,
    #[serde(alias = "indentWidth")]
    pub indent_width: Option<u8>,
}

#[bridge::config]
#[derive(Deserialize, Clone, Default)]
pub struct SQLConfig {
    #[serde(flatten)]
    pub layout: LayoutConfig,

    pub uppercase: Option<bool>,

    #[serde(alias = "linesBetweenQueries")]
    pub lines_between_queries: Option<u8>,

    #[serde(alias = "ignoreCaseConvert")]
    pub ignore_case_convert: Option<Vec<String>>,

    pub inline: Option<bool>,

    #[serde(alias = "maxInlineBlock")]
    pub max_inline_block: Option<usize>,

    #[serde(alias = "maxInlineArguments")]
    pub max_inline_arguments: Option<usize>,

    #[serde(alias = "maxInlineTopLevel")]
    pub max_inline_top_level: Option<usize>,

    #[serde(alias = "joinsAsTopLevel")]
    pub joins_as_top_level: Option<bool>,

    pub dialect: Option<Dialect>,
}

impl bridge::Config for SQLConfig {
    fn decode(bytes: &[u8]) -> Result<Self, String> {
        if bytes.is_empty() {
            return Ok(Self::default());
        }

        serde_json::from_slice(bytes).map_err(|err| err.to_string())
    }
}

impl SQLConfig {
    pub fn to_format_options(&self) -> FormatOptions<'_> {
        let mut config = FormatOptions::default();

        let indent_width = self.layout.indent_width.unwrap_or(2);

        if let Some(indent_style) = self.layout.indent_style {
            config.indent = match indent_style {
                IndentStyle::Tab => sqlformat::Indent::Tabs,
                IndentStyle::Space => sqlformat::Indent::Spaces(indent_width),
            };
        }

        config.uppercase = self.uppercase;

        if let Some(lines_between_queries) = self.lines_between_queries {
            config.lines_between_queries = lines_between_queries;
        }

        if let Some(ref ignore) = self.ignore_case_convert {
            config.ignore_case_convert = Some(ignore.iter().map(|s| s.as_str()).collect());
        }

        if let Some(inline) = self.inline {
            config.inline = inline;
        }

        if let Some(max_inline_block) = self.max_inline_block {
            config.max_inline_block = max_inline_block;
        }

        config.max_inline_arguments = self.max_inline_arguments;
        config.max_inline_top_level = self.max_inline_top_level;

        if let Some(joins_as_top_level) = self.joins_as_top_level {
            config.joins_as_top_level = joins_as_top_level;
        }

        if let Some(dialect) = self.dialect {
            config.dialect = match dialect {
                Dialect::Generic => sqlformat::Dialect::Generic,
                Dialect::PostgreSql => sqlformat::Dialect::PostgreSql,
                Dialect::SQLServer => sqlformat::Dialect::SQLServer,
            };
        }

        config
    }
}
