[![Test](https://github.com/wasm-fmt/sql_fmt/actions/workflows/test.yml/badge.svg)](https://github.com/wasm-fmt/sql_fmt/actions/workflows/test.yml)

# Install

[![npm](https://img.shields.io/npm/v/@wasm-fmt/sql_fmt?color=e38c00)](https://www.npmjs.com/package/@wasm-fmt/sql_fmt)

```bash
npm install @wasm-fmt/sql_fmt
```

[![jsr.io](https://jsr.io/badges/@fmt/sql-fmt?color=e38c00)](https://jsr.io/@fmt/sql-fmt)

```bash
npx jsr add @fmt/sql-fmt
```

# Usage

## Node.js / Deno / Bun / Bundler

```javascript
import { format } from "@wasm-fmt/sql_fmt";

const input = `SELECT count(*),Column1 FROM Table1;`;

const formatted = format(input, "query.sql");
console.log(formatted);
```

## Node.js < 22.19

```JavaScript
import { format } from "@wasm-fmt/sql_fmt/node";
```

## Web

For web environments, you need to initialize WASM module manually:

```javascript
import init, { format } from "@wasm-fmt/sql_fmt/web";

await init();

const input = `SELECT count(*),Column1 FROM Table1;`;

const formatted = format(input, "query.sql");
console.log(formatted);
```

### Vite

```JavaScript
import init, { format } from "@wasm-fmt/sql_fmt/vite";

await init();
// ...
```

## Entry Points

- `.` - Auto-detects environment (Node.js uses node, Webpack uses bundler, default is ESM)
- `./node` - Node.js environment (no init required)
- `./esm` - ESM environments like Deno (no init required)
- `./bundler` - Bundlers like Webpack (no init required)
- `./web` - Web browsers (requires manual init)
- `./vite` - Vite bundler (requires manual init)
