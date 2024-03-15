cd $(dirname $0)/..
wasm-pack build --target=web --scope=wasm-fmt

cp -R ./extra/. ./pkg/

./scripts/package.mjs ./pkg/package.json
