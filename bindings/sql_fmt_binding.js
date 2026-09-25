// @ts-check

const encoder = new TextEncoder();

/**
 * @type {import("@wasm-fmt/runtime").FormatterAdapter<
 *   typeof import("./sql_fmt.d.ts")
 * >}
 */
const adapter = {
	create(wasm, host) {
		const runtime = host.createRuntime(wasm, { encodeConfig });

		/** @type {typeof import("./sql_fmt.d.ts")} */
		const api = {
			/**
			 * @param {string} source
			 * @param {string | import("./sql_fmt.d.ts").ConfigInput} [filenameOrConfig]
			 * @param {import("./sql_fmt.d.ts").ConfigInput} [config]
			 */
			format(source, filenameOrConfig, config) {
				return runtime.format(source, filenameOrConfig, config);
			},
			/** @param {import("./sql_fmt_config.d.ts").Config} [config] */
			createConfig(config) {
				return /** @type {import("./sql_fmt.d.ts").ConfigHandle} */ (runtime.createConfig(config ?? {}));
			},
			/** @param {import("./sql_fmt.d.ts").ConfigHandle} handle */
			releaseConfig(handle) {
				return runtime.releaseConfig(handle);
			},
		};

		return api;
	},
};

export default adapter;

/**
 * @param {unknown} config
 * @return {Uint8Array}
 */
function encodeConfig(config) {
	if (typeof config === "string") {
		return encoder.encode(config);
	}

	const json = JSON.stringify(config);
	if (json === undefined) {
		throw new TypeError("config must be JSON serializable");
	}
	return encoder.encode(json);
}
