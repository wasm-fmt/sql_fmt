import { defineBindings } from "@wasm-fmt/bindgen";

export default defineBindings({
	name: "sql_fmt",
	wasm: "target/wasm32-unknown-unknown/release/sql_fmt.wasm",
	wasmFile: "sql_fmt_bg.wasm",
	adapter: "bindings/sql_fmt_binding.js",
	types: {
		main: "bindings/sql_fmt.d.ts",
	},
	assets: [
		"package.json",
		"jsr.jsonc",
		"README.md",
		"LICENSE-MIT",
		"LICENSE-APACHE",
		"bindings/.npmignore",
		"bindings/sql_fmt_config.d.ts",
	],
	outDir: "pkg",
	clean: true,
});
