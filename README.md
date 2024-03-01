[![npm](https://img.shields.io/npm/v/@wasm-fmt/sql_fmt)](https://www.npmjs.com/package/@wasm-fmt/sql_fmt) [![Test](https://github.com/wasm-fmt/sql_fmt/actions/workflows/test.yml/badge.svg)](https://github.com/wasm-fmt/sql_fmt/actions/workflows/test.yml)

# Install

```bash
npm install @wasm-fmt/sql_fmt
```

# Usage

```javascript
import init, { format } from "@wasm-fmt/sql_fmt";

await init();

const input = `SELECT count(*),Column1 FROM Table1;`;

const formatted = format(input, "query.sql");
console.log(formatted);
```

For Vite users:

```JavaScript
import init, { format } from "@wasm-fmt/sql_fmt/vite";

// ...
```
