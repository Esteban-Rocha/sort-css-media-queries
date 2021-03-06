# sort-css-media-queries

![npm](https://img.shields.io/badge/node-6.3.0-yellow.svg)
![es2015](https://img.shields.io/badge/ECMAScript-2015_(ES6)-blue.svg)
![license](https://img.shields.io/badge/License-MIT-orange.svg)
[![Build Status](https://travis-ci.org/dutchenkoOleg/sort-css-media-queries.svg?branch=master)](https://travis-ci.org/dutchenkoOleg/sort-css-media-queries)
 
 
:us: English
|
:ru: [Русский язык](https://github.com/dutchenkoOleg/sort-css-media-queries/blob/master/README-RU.md)


> The custom `sort` method (mobile-first / desktop-first) for [`css-mqpacker`](https://www.npmjs.com/package/css-mqpacker) or [`pleeease`](https://www.npmjs.com/package/pleeease) (which uses css-mqpacker) or, perhaps, something else ))

[![js happiness style](https://cdn.rawgit.com/JedWatson/happiness/master/badge.svg)](https://github.com/JedWatson/happiness)

## Installing

```shell
npm install --save sort-css-media-queries
# or using yarn cli
yarn add sort-css-media-queries
```

## Usage

See the original docs at first https://www.npmjs.com/package/css-mqpacker#sort;

```js

const sortCSSmq = require('sort-css-media-queries');

// your cool code
// ...

postcss([
  mqpacker({
    sort: sortCSSmq
  })
]).process(css);

```

### mobile-first

The plugin will sort your media-queries according to the mobile-first methodology. The sequence of media requests:

1. `min-width` and `min-height`  from smallest to largest,
1. `max-width` and `max-height` from largest to smallest,
1. `min-device-width` and `min-device-height`  from smallest to largest,
1. `max-device-width` and `max-device-height` from largest to smallest
1. media queries without dimension values, for example `print, tv, ...`.

Example

Media-queries list:

```js
// min-width/-height -> from smallest to largest
'screen and (min-width: 320px) and (max-width: 767px)',
'screen and (min-height: 480px)',
'screen and (min-height: 480px) and (min-width: 320px)',
'screen and (min-width: 640px)',
'screen and (min-width: 1024px)',
'screen and (min-width: 1280px)',

// device
'screen and (min-device-width: 320px) and (max-device-width: 767px)',

// max-width/-height <- from largest to smallest
'screen and (max-width: 1023px)',
'screen and (max-height: 767px) and (min-height: 320px)',
'screen and (max-width: 767px) and (min-width: 320px)',
'screen and (max-width: 639px)',

// no units
'screen and (orientation: landscape)',
'screen and (orientation: portrait)',
'print',
'tv'
```

Sort result:

```js
'screen and (min-width: 320px) and (max-width: 767px)',
'screen and (min-height: 480px)',
'screen and (min-height: 480px) and (min-width: 320px)',
'screen and (min-width: 640px)',
'screen and (min-width: 1024px)',
'screen and (min-width: 1280px)',
'screen and (min-device-width: 320px) and (max-device-width: 767px)',
'screen and (max-width: 1023px)',
'screen and (max-height: 767px) and (min-height: 320px)',
'screen and (max-width: 767px) and (min-width: 320px)',
'screen and (max-width: 639px)',
'print',
'screen and (orientation: landscape)',
'screen and (orientation: portrait)',
'tv'
```

### desktop-first

```js
const sortCSSmq = require('sort-css-media-queries');

// your cool code
// ...

postcss([
  mqpacker({
    sort: sortCSSmq.desktopFirst
  })
]).process(css);

```

The plugin will sort your media-queries according to the desktop-first methodology. The sequence of media requests:

1. `max-width` and `max-height` from largest to smallest,
1. `max-device-width` and `max-device-height` from largest to smallest
1. `min-width` and `min-height`  from smallest to largest,
1. `min-device-width` and `min-device-height`  from smallest to largest,
1. media queries without dimension values, `print, tv, ...`.




## Tests

1. `npm run sort` - test of sorting result
1. `npm run happiness` - test code style
1. `npm test`: `npm run sort` + `npm run happiness`

---

## Project Info

* [Change log](https://github.com/dutchenkoOleg/sort-css-media-queries/blob/master/CHANGELOG.md)
* [Contributing Guidelines](https://github.com/dutchenkoOleg/sort-css-media-queries/blob/master/CONTRIBUTING.md)
* [Contributor Covenant Code of Conduct](https://github.com/dutchenkoOleg/sort-css-media-queries/blob/master/CODE_OF_CONDUCT.md)
* [License MIT](https://github.com/dutchenkoOleg/sort-css-media-queries/blob/master/LICENSE)

