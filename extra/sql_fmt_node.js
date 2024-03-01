import fs from "node:fs/promises";
import initAsync from "./sql_fmt.js";

const wasm = new URL("./sql_fmt_bg.wasm", import.meta.url);

export default function __wbg_init(init = fs.readFile(wasm)) {
    return initAsync(init);
}

export * from "./sql_fmt.js";
