import initAsync from "./sql_fmt.js";
import wasm from "./sql_fmt_bg.wasm?url";

export default function __wbg_init(input = { module_or_path: wasm }) {
	return initAsync(input);
}

export * from "./sql_fmt.js";
