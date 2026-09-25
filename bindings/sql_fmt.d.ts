/**
 * WASM formatter for SQL.
 *
 * @example
 * ```ts
 * import { format } from "@wasm-fmt/sql_fmt";
 *
 * const input = "SELECT * FROM table";
 * const output = format(input);
 * ```
 *
 * @module
 */

import type { ConfigHandle as BridgeConfigHandle } from "@wasm-fmt/runtime";
import type { Config } from "./sql_fmt_config.d.ts";
export type * from "./sql_fmt_config.d.ts";

/**
 * A reusable formatter configuration created inside the WASM instance.
 */
export type ConfigHandle = BridgeConfigHandle<"sql_fmt">;

export type ConfigInput = Config | ConfigHandle;

/**
 * Formats a SQL string.
 */
export declare function format(input: string, config?: ConfigInput): string;

/**
 * Formats a SQL string.
 */
export declare function format(input: string, path?: string, config?: ConfigInput): string;

/**
 * Creates a reusable formatter configuration.
 */
export declare function createConfig(config?: Config): ConfigHandle;

/**
 * Releases a reusable formatter configuration.
 */
export declare function releaseConfig(handle: ConfigHandle): void;
