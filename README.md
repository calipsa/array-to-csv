# @calipsa/array-to-csv

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

## Installation
```bash
# using npm:
npm install --save @calipsa/array-to-csv

# or if you like yarn:
yarn add @calipsa/array-to-csv
```

## Usage
```javascript
import arrayToCsv from '@calipsa/array-to-csv'

const columns = [
  'col1',
  'col2',
  {
    key: 'col3',
    label: 'Column 3',
  },
  {
    key: 'col4',
    label: 'Column 4 (uppercase)',
    transform: (val) => val.toUpperCase(),
  },
]

// get the converter
const toCsv = arrayToCsv(columns)
// get the csv
const result = toCsv(list)
console.log(result)
```

[npm-url]: https://npmjs.org/package/@calipsa/array-to-csv
[downloads-image]: http://img.shields.io/npm/dm/@calipsa/array-to-csv.svg
[npm-image]: http://img.shields.io/npm/v/@calipsa/array-to-csv.svg
[david-dm-url]:https://david-dm.org/inker/@calipsa/array-to-csv
[david-dm-image]:https://david-dm.org/inker/@calipsa/array-to-csv.svg
[david-dm-dev-url]:https://david-dm.org/inker/@calipsa/array-to-csv#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/inker/@calipsa/array-to-csv/dev-status.svg
