interface LayoutConfig {
	indent_style?: "tab" | "space";
	indent_width?: number;
}

/**
 * Configuration options for SQL formatting
 */
export interface Config extends LayoutConfig {
	/**
	 * When set, changes reserved keywords to ALL CAPS
	 *
	 * @default: false
	 */
	uppercase?: boolean;
	/**
	 * Controls the number of line breaks after a query
	 *
	 * @default: 1
	 */
	lines_between_queries?: number;
	/**
	 * Ignore case conversion for specified strings in the array.
	 */
	ignore_case_convert?: string[];
	/**
	 * Keep the query in a single line
	 *
	 * @default: false
	 */
	inline?: boolean;
	/**
	 * Maximum length of an inline block
	 *
	 * @default: 50
	 */
	max_inline_block?: number;
	/**
	 * Maximum length of inline arguments
	 *
	 * If unset keep every argument in a separate line
	 */
	max_inline_arguments?: number;
	/**
	 * Inline the argument at the top level if they would fit a line of this length
	 */
	max_inline_top_level?: number;
	/**
	 * Consider any JOIN statement as a top level keyword instead of a reserved keyword
	 *
	 * @default: false
	 */
	joins_as_top_level?: boolean;
	/**
	 * Tell the SQL dialect to use
	 *
	 * @default: generic
	 */
	dialect?: "generic" | "postgresql" | "sqlserver";
}
