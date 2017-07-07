component-docs
==============

📝 Simple documentation for your React components.

## Goals

- Simple API with zero-configuration
- Fully static, deployable on GitHub pages
- Both server + client routing
- Optimized for mobile screens
- Improved DX with useful features like hot reload

## Non-Goals

- Customizability - it's easy enough to use `react-docgen` directly, though we need some simple customization features

## Installation

```sh
npm install --save-dev component-docs
```

## API

Currently there's no CLI available. You can use the API to generate documentation programmatically.

```js
import path from 'path';
import { build } from 'component-docs';

const files = [
  '../docs/Get Started.md',
  '../src/Button.js',
  '../src/Calendar.js',
];

build({
  files: files.map(file => path.join(__dirname, file)),
  output: path.join(__dirname, 'pages'),
});
```

You can also use the server while actively working on documentation. Just replace `build` with `serve` in the above example.

## Example

`component-docs` is used for [react-native-paper](https://react-native-paper.github.io/)