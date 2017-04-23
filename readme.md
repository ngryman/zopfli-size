# zopfli-size

[![Greenkeeper badge](https://badges.greenkeeper.io/ngryman/zopfli-size.svg)](https://greenkeeper.io/)

> Get the gzipped size of a string or buffer using Zopfli.

[![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://img.shields.io/travis/ngryman/zopfli-size.svg?style=flat
[travis-url]: https://travis-ci.org/ngryman/zopfli-size
[codecov-image]: https://img.shields.io/codecov/c/github/ngryman/zopfli-size.svg
[codecov-url]: https://codecov.io/github/ngryman/zopfli-size


## Usage

```javascript
var zopfliSize = require('zopfli-size');
var string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

console.log(string.length);
//=> 191

console.log(zopfliSize.sync(string));
//=> 148
```


## API

### `zopfliSize(input)`

Return a `Promise` that is resolved with the gzip size of `input. `input` can be a `string` or `Buffer`.

### `zopfliSize.sync(input)`

Return the gzip of `input` size synchronously. `input` can be a `string` or `Buffer`.

### `zopfliSize.strean()`

Return a passthrough stream. The stream emits a `gzip-size` event and has a `gzipSize` property.


## Related

 - [zopfli-size-cli](https://github.com/ngryman/zopfli-size-cli) CLI for this module.


## License

MIT © [Nicolas Gryman](http://ngryman.sh)
