Switch Object Literal
===========

Simplify the lookup of switch describe as object literal.

### Installation
After cloning this repository, make sure to change all the relevant entries in `package.json` so they match your library.
```sh
npm install
```

### Build for npm
```sh
npm run build
```
This will:
 1. Run Webpack starting from the entry point file (`src/library.js`, can be configured)
 2. Convert all files in `src` folder from ES6 to ES5
 3. According to the `bundle-node` flag in `package.json`, it will either:
   1. Leave them as separate files, or -
   2. Minify and bundle them using Webpack, **without their** `node_modules` **dependencies**
 4. Output the result to the `lib` folder

### Build for web
```sh
npm run build-web
```
This will:
 1. Run Webpack starting from the entry point file (`src/library.js`, can be configured)
 2. Convert all files from ES6 to ES5
 3. Minify them, **including all of their module dependencies**, as a UMD module (so the file will be self-contained)
 4. Output the file to the `dist` folder

### Test
```sh
npm run test
```

## License
MIT
