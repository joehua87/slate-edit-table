# react-component-starter-kit
Pre-config starter-kit to write react components

## Features
* eslint
* stylelint
* flow
* lint-staged
* storybook
* nyc

## Commands
### `npm run storybook`
Preview storybook (go to http://localhost:9001)

### `npm run build-storybook`
Build static storybook (output at ./build)

### `npm run gh-pages`
Build storybook & publish to github pages (see https://joehua87.github.io/react-component-starter-kit)

### `npm run test:file -- [-w] [test-file]`
* Run test a single test file.
* [-w] means watch
* Example: `npm run test:file --  -w src/components/Item/__test__/Item.test.js`

### `npm run test:js`
Run all tests

### `npm test`
Run all tests with coverage (output at ./coverage)

### `npm run test:watch`
Run all tests with watch
