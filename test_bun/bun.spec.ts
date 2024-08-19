import { Glob } from "bun";
import { expect, test } from "bun:test";
import path from "node:path";
import init, { format } from "../pkg/sql_fmt";

await init();

const test_root = Bun.fileURLToPath(new URL("../test_data", import.meta.url));
const glob = new Glob("**/*.sql");

for await (const input_path of glob.scan(test_root)) {
	if (path.basename(input_path).startsWith(".")) {
		continue;
	}

	const full_path = path.join(test_root, input_path);

	const [input, expected] = await Promise.all([
		Bun.file(full_path).text(),
		Bun.file(full_path + ".snap").text(),
	]);

	test(input_path, () => {
		const actual = format(input, input_path);
		expect(actual).toBe(expected);
	});
}
