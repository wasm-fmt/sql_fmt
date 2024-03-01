import init, { format } from "../pkg/sql_fmt.js";

import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts";
import { walk } from "https://deno.land/std@0.217.0/fs/walk.ts";
import { relative } from "https://deno.land/std@0.217.0/path/mod.ts";

await init();

const update = Deno.args.includes("--update");

const test_root = new URL("../test_data", import.meta.url);

for await (const entry of walk(test_root, {
	includeDirs: false,
	exts: ["sql"],
})) {
	if (entry.name.startsWith(".")) {
		continue;
	}

	const input = Deno.readTextFileSync(entry.path);

	if (update) {
		const actual = format(input, entry.path);
		Deno.writeTextFileSync(entry.path + ".snap", actual);
	} else {
		const test_name = relative(test_root.pathname, entry.path);
		const expected = Deno.readTextFileSync(entry.path + ".snap");

		Deno.test(test_name, () => {
            const actual = format(input, entry.path);
			assertEquals(actual, expected);
		});
	}
}
