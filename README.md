[![Test](https://github.com/wasm-fmt/sql_fmt/actions/workflows/test.yml/badge.svg)](https://github.com/wasm-fmt/sql_fmt/actions/workflows/test.yml)

# Install

[![npm](https://img.shields.io/npm/v/@wasm-fmt/sql_fmt)](https://www.npmjs.com/package/@wasm-fmt/sql_fmt)

```bash
npm install @wasm-fmt/sql_fmt
```

[![jsr.io](https://jsr.io/badges/@fmt/sql-fmt)](https://jsr.io/@fmt/sql-fmt)

```bash
npx jsr add @fmt/sql-fmt
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
